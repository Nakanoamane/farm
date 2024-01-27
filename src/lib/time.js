export const timeStr = (time) => {
	let h = 0;
	let m = 0;
	let s = 0;
	if(time > 0) {
		h = Math.floor(time / 3600);
		m = Math.floor((time - h * 3600) / 60);
		s = time - h * 3600 - m * 60;
	}
	const h_str = String(h).padStart(2, '0');
	const m_str = String(m).padStart(2, '0');
	const s_str = String(s).padStart(2, '0');

	return `${h_str}:${m_str}:${s_str}`;
}