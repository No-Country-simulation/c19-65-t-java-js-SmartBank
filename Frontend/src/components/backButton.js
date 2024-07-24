document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('backButtonPlaceholder');

  if (placeholder) {
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: flex-start;'; // Estilos del contenedor

    const backButton = document.createElement('button');
    backButton.innerHTML = `
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.9683 17.8867L19.855 25L26.9683 32.1134C27.6833 32.8284 27.6833 33.9834 26.9683 34.6984C26.2533 35.4134 25.0983 35.4134 24.3833 34.6984L15.9683 26.2834C15.2533 25.5684 15.2533 24.4134 15.9683 23.6984L24.3833 15.2834C25.0983 14.5684 26.2533 14.5684 26.9683 15.2834C27.665 15.9984 27.6833 17.1717 26.9683 17.8867Z" fill="#323232"/>
      </svg>
    `;
    backButton.style.cssText = 'border: 1px solid transparent; background: none; cursor: pointer; padding: 0; margin-left: 3rem; margin-top: 0.5rem; outline: none;'; // Estilos del botón

    //* Funciones para manejar los estilos de hover
    const applyHoverStyle = () => {
      backButton.style.opacity = '0.7';
      backButton.style.border = '1px solid #323232';
      backButton.style.borderRadius = '10%';
      backButton.style.boxShadow = '0 0 10px #323232';
    };

    const removeHoverStyle = () => {
      backButton.style.opacity = '1';
      backButton.style.border = '1px solid transparent';
      backButton.style.boxShadow = 'none';
    };

    backButton.addEventListener('mouseenter', applyHoverStyle);
    backButton.addEventListener('mouseleave', removeHoverStyle);

    backButton.addEventListener('click', () => window.history.back());

    container.appendChild(backButton);
    placeholder.replaceWith(container);
  }
});