// call API to get data
const fetch_Data = async (index,row) => {
    try{
        const response = await fetch(`https://filltext.com?rows=${row}&id=${index}&fname=%7BfirstName%7D&Iname=%7BlastName%7D&category=%5B%22category1%22%2C%22category2%22%2C%22category3%22%5D`);
        const data = await response.json();
    console.log(data);
    return data;
    }
    catch(err){
        console.log(err);
    }
    }

// create table
const createTable = (data) => {
    let table = document.getElementById('table');
    table.innerHTML = '';
    let tableHead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let header = document.createElement('th');
    let header2 = document.createElement('th');
    
    header.innerHTML = 'Name';
    header.setAttribute('colspan', '1');
    header2.innerHTML = 'Category';
    header2.setAttribute('colspan', '1');
    
    headerRow.appendChild(header);
    headerRow.appendChild(header2);
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);
    
    let tableBody = document.createElement('tbody');
    let count = 1;
    data.forEach((row) => {
      let tableRow = document.createElement('tr');
      // check if count is odd or even
        if (count % 2 === 0) {
            tableRow.classList.add('even');
        } else {
            tableRow.classList.add('odd');
        }
        count++;
      let nameCell = document.createElement('td');
      let categoryCell = document.createElement('td');
      let nameContainer = document.createElement('div');
      let nameCircle = document.createElement('div');
      let nameInitial = document.createElement('div');
      
      // Extract the first initial from the combined name
      let initials = row.fname.charAt(0) + row.Iname.charAt(0);
      
      nameCell.classList.add('name-cell');
      nameContainer.classList.add('name-container');
      nameCircle.classList.add('name-circle');
      nameInitial.classList.add('name-initial');
      
      nameInitial.innerHTML = initials;
      nameCircle.appendChild(nameInitial);
      nameContainer.appendChild(nameCircle);
      nameContainer.appendChild(document.createTextNode(row.fname + ' ' + row.Iname));
      
      nameCell.appendChild(nameContainer);
      categoryCell.innerHTML = row.category;
      tableRow.appendChild(nameCell);
      tableRow.appendChild(categoryCell);
      tableBody.appendChild(tableRow);
    });
    
    table.appendChild(tableBody);
  }

const CallDateAndBuildTable = (index,row) => {
    fetch_Data(index,row).then((data) => {
        createTable(data);

    })
}


const addEventListenerForSelectCategory = () => {
    let selectCategory = document.getElementById('category');
    selectCategory.addEventListener('change', (event) => {
        let selectedCategory = event.target.value;
        let tableRows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        let count = 1;
        // get odd_back for what we selected
        let selectedOption = selectCategory.options[selectCategory.selectedIndex];
        let get_odd_back = selectedOption.getAttribute('odd_back');
        let get_even_back = selectedOption.getAttribute('even_back');
        for (const element of tableRows) {
            // // check if element is even or odd
            let categoryCell = element.getElementsByTagName('td')[1];
            let category = categoryCell.innerHTML;
            if (selectedCategory === 'All') {
                element.style.display = '';
                if (count % 2 === 0) {
                    element.style.backgroundColor = get_even_back
                } else {
                    element.style.backgroundColor = get_odd_back
                }
                count++;
                continue;
                
            }

             if (category === selectedCategory) {
                element.style.display = '';
                
            } else {
                element.style.display = 'none';
            }
        }
        
        
    });
}

const addEventListenerForChangePage = () => {
    let page = document.getElementById('page');
    page.addEventListener('change', (event) => {
        let selectedPage = event.target.value;
        let size_Select = document.getElementById('page_size');
        let selectedPageSize = size_Select.value;
        CallDateAndBuildTable(selectedPage,selectedPageSize);
    });
}

const addEventListenerForChangePageSize = () => {
    let pageSize = document.getElementById('page_size');
    pageSize.addEventListener('change', (event) => {
        let selectedPageSize = event.target.value;
        // get page value Selected
        let page_select = document.getElementById('page');
        let selectedPage = page_select.value;
        CallDateAndBuildTable(selectedPage,selectedPageSize);
    });
}


const addEventListenerForSearch = () => {
    let searchButton = document.getElementById('search_button');
    searchButton.addEventListener('click', (event) => {
        let searchInput = document.getElementById('search_input');
        let searchValue = searchInput.value;
        let tableRows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (const element of tableRows) {
            let nameCell = element.getElementsByTagName('td')[0];
            let name = nameCell.innerHTML;
            if (name.includes(searchValue)) {
                // add style for what we search
                let nameContainer = nameCell.getElementsByClassName('name-container')[0];
                // add background for character
                let nameCircle = nameContainer.getElementsByClassName('name-circle')[0];
                nameCircle.style.backgroundColor = 'rgb(255, 255, 0)';
                // add background for name
                let nameInitial = nameCircle.getElementsByClassName('name-initial')[0];
                nameInitial.style.backgroundColor = 'rgb(255, 255, 0)';
                
                
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        }
    });
}
        
const addEventListenerForReset = () => {
    let resetButton = document.getElementById('reset_button');
    resetButton.addEventListener('click', (event) => {
        CallDateAndBuildTable(1,10);
        // reset search input
        let searchInput = document.getElementById('search_input');
        searchInput.value = '';
        // reset select category    
        let selectCategory = document.getElementById('category');
        selectCategory.value = 'All';
        // reset page size
        let pageSize = document.getElementById('page_size');
        pageSize.value = 10;
        // reset page
        let page = document.getElementById('page');
        page.value = 1;
    
    });
}

CallDateAndBuildTable(1,10);
addEventListenerForSelectCategory();
addEventListenerForChangePage();
addEventListenerForChangePageSize();
addEventListenerForSearch();
addEventListenerForReset();