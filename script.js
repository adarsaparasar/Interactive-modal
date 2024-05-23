document.addEventListener('DOMContentLoaded', () => {
    showCategory('Personal');
    updateSelectedInfo();
    updatePagination();
});

function showCategory(category) {
     //bold the text
     document.getElementById(category).style.fontWeight = "bold";
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // Add active class to the clicked tab
    document.querySelector(`.tab:contains(${category})`).classList.add('active');
    
    // Filter rows based on the selected category
    document.querySelectorAll('.attributes-table tbody tr').forEach(row => {
        if (row.getAttribute('data-category').includes(category) || category === 'All') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

   

    updatePagination();
}

function filterAttributes() {
    const searchInput = document.querySelector('.search-bar').value.toLowerCase();
    const rows = document.querySelectorAll('.attributes-table tbody tr');
    
    rows.forEach(row => {
        const attribute = row.children[1].textContent.toLowerCase();
        const description = row.children[4].textContent.toLowerCase();
        
        if (attribute.includes(searchInput) || description.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // updatePagination();
}

function updateSelectedInfo() {
    const selected = Array.from(document.querySelectorAll('.attributes-table tbody input:checked'))
        .map(input => input.closest('tr').children[1].textContent)
        .join(', ');
    document.getElementById('selected-attributes').textContent = selected;
    document.querySelector('.selected-info span').textContent = `Selected (${document.querySelectorAll('.attributes-table tbody input:checked').length}):`;
}

function updatePagination() {
    const rows = document.querySelectorAll('.attributes-table tbody tr');
    const rowsPerPage = 10;
    const totalPages = Math.ceil(Array.from(rows).filter(row => row.style.display !== 'none').length / rowsPerPage);
    document.getElementById('total-pages').textContent = totalPages;
    
    let currentPage = parseInt(document.getElementById('current-page').textContent);
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    document.getElementById('current-page').textContent = currentPage;

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    let count = 0;
    rows.forEach((row, index) => {
        if (row.style.display !== 'none') {
            row.style.display = (count >= start && count < end) ? '' : 'none';
            count++;
        }
    });

    document.querySelector('.page-btn').disabled = currentPage <= 1;
    document.querySelector('.page-btn:nth-of-type(2)').disabled = currentPage >= totalPages;
}

function prevPage() {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    document.getElementById('current-page').textContent = currentPage - 1;
    
}

function nextPage() {
    const currentPage = parseInt(document.getElementById('current-page').textContent);
    document.getElementById('current-page').textContent = currentPage + 1;
    
}

document.querySelector('.modal').addEventListener('change', updateSelectedInfo);
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});
