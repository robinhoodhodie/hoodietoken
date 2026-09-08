/**
 * Hoodie ($HOODIE) website logic.
 *
 * Design rule for this file: it never invents market data. There is no simulated
 * transaction feed, no animated curve progress, and no price projection. Anything
 * that looks like live data would have to come from the chain, and this is a static
 * site — so the site links out to Pons for real numbers instead of faking them.
 */

/* ==========================================================================
   CONFIG — fill this in after the token is deployed on Pons.
   Everything left empty renders as "TBD" / "Not deployed yet" on the page.
   ========================================================================== */
const CONFIG = {
  // Paste the 0x... address Pons gives you after launch.
  contractAddress: '',

  // The token's own Pons page, e.g. https://www.ponsfamily.com/launchpad/token/0x...
  ponsTokenUrl: '',

  // Fallback while the token does not exist yet.
  ponsLaunchpadUrl: 'https://www.ponsfamily.com/launchpad',

  // Total supply as reported by the deployed contract. Number, or null while unknown.
  totalSupply: null,

  // Creator fee actually set on the launchpad, in percent.
  creatorTaxPercent: 2.0,

  // The creator's own opening buy, e.g. '0.02 ETH'. Empty while unknown.
  creatorOpeningBuy: '',

  // Handles only, no URL and no @. Empty hides the link.
  xHandle: 'hoodietoken',
  telegramHandle: ''
};

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initMobileNav();
  initCopyContract();
  initCalculator();
  initFAQ();
});

/* ==========================================================================
   Config application
   ========================================================================== */
function isLaunched() {
  return /^0x[a-fA-F0-9]{40}$/.test(CONFIG.contractAddress.trim());
}

function buyUrl() {
  return CONFIG.ponsTokenUrl.trim() || CONFIG.ponsLaunchpadUrl;
}

function applyConfig() {
  const launched = isLaunched();
  const tax = CONFIG.creatorTaxPercent.toFixed(1) + '%';
  const supply = CONFIG.totalSupply
    ? CONFIG.totalSupply.toLocaleString('en-US')
    : 'TBD';

  const values = {
    tax: tax,
    supply: supply,
    devBuy: CONFIG.creatorOpeningBuy.trim() || 'TBD',
    statusTag: launched ? 'LIVE ON PONS' : 'PRE-LAUNCH',
    buyLabel: launched ? 'Trade on Pons' : 'View on Pons'
  };

  document.querySelectorAll('[data-cfg]').forEach(el => {
    const key = el.dataset.cfg;
    if (key === 'buyLink') {
      el.setAttribute('href', buyUrl());
      return;
    }
    if (key in values) {
      el.textContent = values[key];
    }
  });

  // Contract address + copy button
  const addressEl = document.getElementById('contractAddress');
  const copyBtn = document.getElementById('copyBtn');
  if (addressEl) {
    addressEl.textContent = launched ? CONFIG.contractAddress.trim() : 'Not deployed yet';
  }
  if (copyBtn) {
    copyBtn.disabled = !launched;
  }

  // Supply prefill for the calculator, when known
  const supplyInput = document.getElementById('supplyInput');
  if (supplyInput && CONFIG.totalSupply) {
    supplyInput.value = CONFIG.totalSupply;
  }

  applySocialLinks();
}

function applySocialLinks() {
  const links = [
    { id: 'footerXLink', handle: CONFIG.xHandle, base: 'https://x.com/' },
    { id: 'footerTgLink', handle: CONFIG.telegramHandle, base: 'https://t.me/' }
  ];

  let anyShown = false;
  links.forEach(({ id, handle, base }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const clean = handle.trim().replace(/^@/, '');
    if (clean) {
      el.href = base + clean;
      el.hidden = false;
      anyShown = true;
    } else {
      el.hidden = true;
    }
  });

  const empty = document.getElementById('communityEmpty');
  if (empty) empty.hidden = anyShown;
}

/* ==========================================================================
   Mobile navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => links.classList.toggle('active'));
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('active'));
  });
}

/* ==========================================================================
   Copy contract address
   ========================================================================== */
function initCopyContract() {
  const copyBtn = document.getElementById('copyBtn');
  const addressEl = document.getElementById('contractAddress');
  const copyText = document.getElementById('copyText');
  if (!copyBtn || !addressEl) return;

  copyBtn.addEventListener('click', () => {
    if (!isLaunched()) {
      showToast('No contract address yet — the token has not been deployed.');
      return;
    }
    const address = addressEl.textContent.trim();
    navigator.clipboard.writeText(address).then(() => {
      if (copyText) copyText.textContent = 'Copied!';
      showToast('Address copied. Verify it on Pons before trading.');
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      showToast('Copy failed. Address: ' + address);
    });
  });
}

/* ==========================================================================
   Toast
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   Market cap -> price arithmetic
   Deliberately one division. No entry price, no multiplier, no projected value:
   this converts a hypothetical market cap into an implied unit price, and says so.
   ========================================================================== */
function initCalculator() {
  const supplyInput = document.getElementById('supplyInput');
  const mcapRange = document.getElementById('mcapRange');
  const customMcapVal = document.getElementById('customMcapVal');
  const milestoneBtns = document.querySelectorAll('.m-btn');
  const impliedPriceEl = document.getElementById('impliedPrice');
  const valuePerMillionEl = document.getElementById('valuePerMillion');

  if (!supplyInput || !mcapRange || !impliedPriceEl) return;

  function formatPrice(value) {
    if (!isFinite(value) || value <= 0) return '—';
    if (value >= 1) return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 4 });
    // Small unit prices need enough decimals to stay meaningful.
    return '$' + value.toFixed(8);
  }

  function update() {
    const supply = parseFloat(supplyInput.value);
    const mcap = parseFloat(mcapRange.value) || 0;

    customMcapVal.textContent = '$' + mcap.toLocaleString('en-US');

    if (!supply || supply <= 0) {
      impliedPriceEl.textContent = '—';
      valuePerMillionEl.textContent = '—';
      return;
    }

    const pricePerToken = mcap / supply;
    impliedPriceEl.textContent = formatPrice(pricePerToken);
    valuePerMillionEl.textContent = '$' + (pricePerToken * 1000000).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  supplyInput.addEventListener('input', update);
  mcapRange.addEventListener('input', () => {
    milestoneBtns.forEach(btn => btn.classList.remove('active'));
    update();
  });

  milestoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      milestoneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mcapRange.value = btn.dataset.mcap;
      update();
    });
  });

  update();
}

/* ==========================================================================
   FAQ accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}
