/**
 * Author: Anh Quân (11/07/2023)
 * Description: Custom Directives tooltip
 * Muốn dùng chỉ cần v-tooltip="Nội dung"
 */
export const tooltipDerective = (el, binding) => {
    const text = binding.value;
    let tooltip = null;

    const showTooltip = (e) => {
        tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = text;
        const left = e.clientX;
        const right = e.clientY;
        tooltip.style.left = left + 'px';
        tooltip.style.top = right + 'px';
        document.querySelector('#app').appendChild(tooltip);
        el.appendChild(tooltip);
    };

    const hideTooltip = () => {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    };
    if (!text) {
        el.onmouseenter = hideTooltip;
    } else {
        el.onmouseenter = showTooltip;
        el.addEventListener('mouseleave', hideTooltip);
    }
    // el.onmouseenter = showTooltip;
    // el.addEventListener('mouseleave', hideTooltip);
};