// Constantes de conversión
const DIVISOR_FT3 = 28320;
const DIVISOR_CBM = 35.31;

// Función para calcular ft³
// Fórmula: alto * largo * ancho / 28320
function calculateFT3() {
    const length = parseFloat(document.getElementById('ft3-length').value);
    const width = parseFloat(document.getElementById('ft3-width').value);
    const height = parseFloat(document.getElementById('ft3-height').value);

    // Validar que todos los valores sean números positivos
    if (isNaN(length) || isNaN(width) || isNaN(height) || 
        length <= 0 || width <= 0 || height <= 0) {
        document.getElementById('ft3-value').textContent = 'Error';
        document.getElementById('ft3-value').style.color = '#f5576c';
        return;
    }

    // Calcular volumen en pies cúbicos: alto * largo * ancho / 28320
    const ft3 = (height * length * width) / DIVISOR_FT3;
    
    // Mostrar resultado
    document.getElementById('ft3-value').textContent = ft3.toFixed(4);
    document.getElementById('ft3-value').style.color = '#667eea';
}

// Función para calcular CBM
// Fórmula: pie cúbico / 35.31
// Primero calcula el pie cúbico y luego lo convierte a CBM
function calculateCBM() {
    const length = parseFloat(document.getElementById('cbm-length').value);
    const width = parseFloat(document.getElementById('cbm-width').value);
    const height = parseFloat(document.getElementById('cbm-height').value);

    // Validar que todos los valores sean números positivos
    if (isNaN(length) || isNaN(width) || isNaN(height) || 
        length <= 0 || width <= 0 || height <= 0) {
        document.getElementById('cbm-value').textContent = 'Error';
        document.getElementById('cbm-value').style.color = '#f5576c';
        return;
    }

    // Primero calcular pie cúbico: alto * largo * ancho / 28320
    const ft3 = (height * length * width) / DIVISOR_FT3;
    
    // Luego convertir a metros cúbicos: pie cúbico / 35.31
    const cbm = ft3 / DIVISOR_CBM;
    
    // Mostrar resultado
    document.getElementById('cbm-value').textContent = cbm.toFixed(4);
    document.getElementById('cbm-value').style.color = '#667eea';
}

// Función para convertir unidades
function convertUnits() {
    const fromValue = parseFloat(document.getElementById('convert-from').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;

    // Validar entrada
    if (isNaN(fromValue) || fromValue < 0) {
        document.getElementById('convert-to').value = '';
        alert('Por favor, ingrese un valor válido');
        return;
    }

    let result;

    // Si las unidades son iguales, no hay conversión
    if (fromUnit === toUnit) {
        result = fromValue;
    } 
    // Convertir de CBM a ft³: CBM * 35.31
    else if (fromUnit === 'cbm' && toUnit === 'ft3') {
        result = fromValue * DIVISOR_CBM;
    } 
    // Convertir de ft³ a CBM: ft³ / 35.31
    else if (fromUnit === 'ft3' && toUnit === 'cbm') {
        result = fromValue / DIVISOR_CBM;
    }

    // Mostrar resultado
    document.getElementById('convert-to').value = result.toFixed(4);
}

// Permitir calcular con Enter
document.addEventListener('DOMContentLoaded', function() {
    // Para CBM
    document.getElementById('cbm-length').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateCBM();
    });
    document.getElementById('cbm-width').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateCBM();
    });
    document.getElementById('cbm-height').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateCBM();
    });

    // Para ft³
    document.getElementById('ft3-length').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateFT3();
    });
    document.getElementById('ft3-width').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateFT3();
    });
    document.getElementById('ft3-height').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateFT3();
    });

    // Para conversor
    document.getElementById('convert-from').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') convertUnits();
    });

    // Actualizar select de destino cuando cambia el de origen
    document.getElementById('from-unit').addEventListener('change', function() {
        const fromUnit = this.value;
        const toUnitSelect = document.getElementById('to-unit');
        toUnitSelect.value = fromUnit === 'cbm' ? 'ft3' : 'cbm';
    });
});

