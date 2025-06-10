const copyrightElement = document.getElementById('copyright');
const lastModifiedElement = document.getElementById('lastModified');

const currentYear = new Date().getFullYear();
copyrightElement.textContent = `© ${currentYear}`;

const lastModified = document.lastModified;
lastModifiedElement.textContent = `Last Modified: ${lastModified}`;