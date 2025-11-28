// Calculator logic adapted from the provided React example (vanilla JS)
document.addEventListener('DOMContentLoaded', function () {
	// Elements
	const els = {
		type: document.getElementById('type'),
		capacity: document.getElementById('capacity'),
		capex: document.getElementById('capex'),
		productionPerKwp: document.getElementById('productionPerKwp'),
		capacityFactor: document.getElementById('capacityFactor'),
		pricePerKwh: document.getElementById('pricePerKwh'),
		omAnnual: document.getElementById('omAnnual'),
		degradation: document.getElementById('degradation'),
		lifeYears: document.getElementById('lifeYears'),
		valueExcess: document.getElementById('valueExcess'),
		discountRate: document.getElementById('discountRate'),
		advDeg: document.getElementById('adv-deg'),
		advLife: document.getElementById('adv-life'),
		advExcess: document.getElementById('adv-excess'),
		advDiscount: document.getElementById('adv-discount'),
		toggleAdvanced: document.getElementById('toggle-advanced'),
		labelHours: document.getElementById('label-hours'),
		labelCf: document.getElementById('label-cf'),

		productionAnnual: document.getElementById('productionAnnual'),
		economyYear1: document.getElementById('economyYear1'),
		payback: document.getElementById('payback'),
		npv: document.getElementById('npv'),
		lcoe: document.getElementById('lcoe'),
		capexOut: document.getElementById('capexOut'),

		cashflowLine: document.getElementById('cashflowLine'),
		cashflowChart: document.getElementById('cashflowChart'),
		paybackLine: document.getElementById('paybackLine'),

		copySummary: document.getElementById('copySummary'),
		printBtn: document.getElementById('printBtn'),
	};

	// Navigation removed (no header present)

	// helpers
	const fmt = (v) => {
		if (v === null || v === undefined || Number.isNaN(Number(v))) return '—';
		return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });
	};
	const fmtNum = (v, digits = 0) => {
		if (v === null || v === undefined || Number.isNaN(Number(v))) return '—';
		return Number(v).toLocaleString('pt-BR', { maximumFractionDigits: digits });
	};

	function getValues() {
		return {
			type: els.type.value,
			capacity: Number(els.capacity.value) || 0,
			capex: Number(els.capex.value) || 0,
			productionPerKwp: Number(els.productionPerKwp.value) || 0,
			capacityFactor: (Number(els.capacityFactor.value) || 0) / 100,
			pricePerKwh: Number(els.pricePerKwh.value) || 0,
			omAnnual: Number(els.omAnnual.value) || 0,
			degradation: (Number(els.degradation.value) || 0) / 100,
			lifeYears: Number(els.lifeYears.value) || 1,
			valueExcess: Number(els.valueExcess.value) || Number(els.pricePerKwh.value) || 0,
			discountRate: (Number(els.discountRate.value) || 0) / 100,
		};
	}

	function calcProductionAnnual(values) {
		const cap = values.capacity || 0;
		if (values.type === 'solar') {
			// productionPerKwp is kWh produced per kWp per year
			const p = values.productionPerKwp || 0;
			return cap * p;
		}
		// wind/eólico
		const cf = values.capacityFactor || 0;
		return cap * 8760 * cf;
	}

	function lifeSummary(values, productionAnnual) {
		const years = values.lifeYears || 1;
		const deg = values.degradation || 0;
		const price = values.pricePerKwh || 0;
		const om = values.omAnnual || 0;
		const r = values.discountRate || 0;

		let cumulativeEnergy = 0;
		const discountedCashFlows = [];
		let cumulativeCash = -values.capex || 0;

		for (let y = 1; y <= years; y++) {
			const annualProd = productionAnnual * Math.pow(1 - deg, y - 1);
			cumulativeEnergy += annualProd;

			const revenue = annualProd * price;
			const net = revenue - om;
			cumulativeCash += net;

			discountedCashFlows.push({ year: y, annualProd, revenue, net, cumulativeCash });
		}

		// payback
		let payback = null;
		for (let i = 0; i < discountedCashFlows.length; i++) {
			if (discountedCashFlows[i].cumulativeCash >= 0) {
				payback = discountedCashFlows[i].year;
				break;
			}
		}

		// NPV
		let npv = -values.capex || 0;
		for (let y = 1; y <= years; y++) {
			const annualProd = productionAnnual * Math.pow(1 - deg, y - 1);
			const revenue = annualProd * price;
			const net = revenue - om;
			npv += net / Math.pow(1 + r, y);
		}

		// LCOE
		let discountedCosts = values.capex || 0;
		let discountedEnergy = 0;
		for (let y = 1; y <= years; y++) {
			const annualProd = productionAnnual * Math.pow(1 - deg, y - 1);
			discountedCosts += om / Math.pow(1 + r, y);
			discountedEnergy += annualProd / Math.pow(1 + r, y);
		}
		const lcoe = discountedEnergy > 0 ? discountedCosts / discountedEnergy : null;

		const economyYear1 = productionAnnual * price - om;

		return { productionAnnual, discountedCashFlows, payback, npv, lcoe, economyYear1 };
	}

	function updateChart(discountedCashFlows, payback) {
		const line = els.cashflowLine;
		const svg = els.cashflowChart;
		const payLine = els.paybackLine;
		if (!line || !svg) return;

		const values = discountedCashFlows.map((d) => d.cumulativeCash);
		const min = Math.min(...values, -Number(els.capex.value) || 0);
		const max = Math.max(...values, 0, Math.abs(min));

		const points = discountedCashFlows.map((d, i) => {
			const x = 40 + (i / Math.max(1, discountedCashFlows.length - 1)) * 540;
			const y = 100 - ((d.cumulativeCash - min) / (max - min || 1)) * 85;
			return `${x},${y}`;
		});
		line.setAttribute('points', points.join(' '));

		if (payback && payback <= discountedCashFlows.length) {
			const i = payback - 1;
			const x = 40 + (i / Math.max(1, discountedCashFlows.length - 1)) * 540;
			payLine.setAttribute('x1', x);
			payLine.setAttribute('x2', x);
			payLine.setAttribute('y1', 10);
			payLine.setAttribute('y2', 100);
			payLine.style.display = 'block';
		} else {
			payLine.style.display = 'none';
		}
	}

	function render() {
		const vals = getValues();
		const productionAnnual = calcProductionAnnual(vals);
		const summary = lifeSummary(vals, productionAnnual);

		els.productionAnnual.textContent = fmtNum(summary.productionAnnual, 0);
		els.economyYear1.textContent = fmt(summary.economyYear1);
		els.payback.textContent = summary.payback ?? '—';
		if (els.npv) els.npv.textContent = fmt(summary.npv);
		if (els.lcoe) els.lcoe.textContent = summary.lcoe ? summary.lcoe.toFixed(3) : '—';
		if (els.capexOut) els.capexOut.textContent = fmt(vals.capex);

		updateChart(summary.discountedCashFlows, summary.payback);
	}

	// bind events
	['change', 'input'].forEach((ev) => {
		['type', 'capacity', 'capex', 'productionPerKwp', 'capacityFactor', 'pricePerKwh', 'omAnnual', 'degradation', 'lifeYears', 'valueExcess', 'discountRate'].forEach((id) => {
			const el = document.getElementById(id);
			if (el) el.addEventListener(ev, render);
		});
	});

	// toggle advanced: show/hide the individual advanced fields we added in the grid
	els.toggleAdvanced.addEventListener('click', function (e) {
		e.preventDefault();
		// determine current state by checking one of the adv elements
		const currentlyShown = els.advDeg && els.advDeg.style.display !== 'none';
		const newState = currentlyShown ? 'none' : '';
		[els.advDeg, els.advLife, els.advExcess, els.advDiscount].forEach((el) => {
			if (!el) return;
			el.style.display = newState;
		});
		els.toggleAdvanced.textContent = currentlyShown ? 'Mostrar avançado' : 'Esconder avançado';
		render();
	});

	// handle type switch (show hours or capacity factor)
	els.type.addEventListener('change', function () {
		if (els.type.value === 'solar') {
			els.labelHours.style.display = '';
			els.labelCf.style.display = 'none';
		} else {
			els.labelHours.style.display = 'none';
			els.labelCf.style.display = '';
		}
		render();
	});

	// copy and print
	els.copySummary.addEventListener('click', function () {
		const prod = document.getElementById('productionAnnual')?.textContent || '—';
		const eco = document.getElementById('economyYear1')?.textContent || '—';
		const pb = document.getElementById('payback')?.textContent || '—';
		const npvText = document.getElementById('npv') ? document.getElementById('npv').textContent : null;
		const lcoeText = document.getElementById('lcoe') ? document.getElementById('lcoe').textContent : null;
		let txt = `Produção anual: ${prod} kWh\nEconomia anual (ano 1): ${eco}\nPayback (anos): ${pb}`;
		if (npvText) txt += `\nNPV: ${npvText}`;
		if (lcoeText) txt += `\nLCOE: ${lcoeText}`;
		navigator.clipboard?.writeText(txt);
		alert('Resumo copiado para a área de transferência');
	});

	els.printBtn.addEventListener('click', function () {
		window.print();
	});

	// initial render
	// set initial visibility based on default type
	if (els.type.value === 'solar') {
		els.labelHours.style.display = '';
		els.labelCf.style.display = 'none';
	} else {
		els.labelHours.style.display = 'none';
		els.labelCf.style.display = '';
	}

	render();

	// Mobile menu toggle
	const menuBtn = document.getElementById('menuBtn');
	const mobileNav = document.getElementById('mobileNav');
	const siteHeader = document.querySelector('.site-header');
	if (menuBtn && mobileNav) {
		menuBtn.setAttribute('aria-expanded', 'false');
		menuBtn.setAttribute('aria-controls', 'mobileNav');
		menuBtn.addEventListener('click', function (e) {
			e.preventDefault();
			const open = mobileNav.classList.toggle('open');
			menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
		});

		// close when a link is clicked
		mobileNav.querySelectorAll('a').forEach((a) => {
			a.addEventListener('click', function () {
				mobileNav.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			});
		});

		// close on resize to desktop
		window.addEventListener('resize', function () {
			if (window.innerWidth > 880) {
				mobileNav.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			}
		});

		// click outside header closes mobile nav
		document.addEventListener('click', function (ev) {
			if (!mobileNav.classList.contains('open')) return;
			if (!siteHeader) return;
			if (!siteHeader.contains(ev.target)) {
				mobileNav.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			}
		});
	}
});

