// Función para manejar clics en los botones de acción
function handleViewAction(expediente) {
    console.log('Ver expediente:', expediente);
    // Aquí puedes agregar la lógica para ver el expediente
}

function handleDownloadAction(expediente) {
    console.log('Descargar expediente:', expediente);
    // Aquí puedes agregar la lógica para descargar el expediente
}

// Agregar event listeners a los botones de acción
document.addEventListener('DOMContentLoaded', function() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const downloadBtns = document.querySelectorAll('.download-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const expediente = this.closest('tr').querySelector('.expediente-number').textContent;
            handleViewAction(expediente);
        });
    });

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const expediente = this.closest('tr').querySelector('.expediente-number').textContent;
            handleDownloadAction(expediente);
        });
    });

    // Manejar cambios en el filtro
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', function() {
        console.log('Filtrar por:', this.value);
        // Aquí puedes agregar la lógica de filtrado
    });
});