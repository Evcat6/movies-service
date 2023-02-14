function createSvgHurt(color: string): SVGSVGElement {
    const svgContainer: SVGSVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );

    svgContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgContainer.setAttribute('stroke', 'red');
    svgContainer.setAttribute('fill', color);
    svgContainer.setAttribute('width', '50');
    svgContainer.setAttribute('height', '50');

    svgContainer.setAttribute(
        'class',
        'bi bi-heart-fill position-absolute p-2'
    );
    svgContainer.setAttribute('viewBox', '0 -2 18 22');

    const pathElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    pathElement.setAttribute('fill-rule', 'evenodd');

    pathElement.setAttribute(
        'd',
        'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
    );

    svgContainer.appendChild(pathElement);
    return svgContainer;
}

export { createSvgHurt };
