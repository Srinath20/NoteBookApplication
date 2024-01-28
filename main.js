let notebooks = [];
  window.onload = function () {
    axios.get('https://crudcrud.com/api/c7d2e7de116c4e9893222725c44f3cf8/appointmentData')
      .then(response => {
        notebooks = response.data;
        displayNotebooks();
        updateCounts();
      })
      .catch(error => console.error(error));
  };

  function addNotebook() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
      const newNotebook = { title, description };
      axios.post('https://crudcrud.com/api/c7d2e7de116c4e9893222725c44f3cf8/appointmentData', newNotebook)
        .then(response => {
          notebooks.push(response.data);
          displayNotebooks();
          updateCounts();
        })
        .catch(error => console.error(error));
    }
  }

  function displayNotebooks(filteredNotebooks = null) {
    const notebooksContainer = document.getElementById('notebooks');
    notebooksContainer.innerHTML = '';

    const notebooksToDisplay = filteredNotebooks || notebooks;

    notebooksToDisplay.forEach(notebook => {
      const notebookDiv = document.createElement('div');
      notebookDiv.classList.add('notebook');
      notebookDiv.innerHTML = `<h3>${notebook.title}</h3><p>${notebook.description}</p>`;
      notebooksContainer.appendChild(notebookDiv);
    });
  }

  function updateCounts() {
    const totalCount = document.getElementById('totalCount');
    const filteredCount = document.getElementById('filteredCount');

    totalCount.textContent = `Total Notebooks: ${notebooks.length}`;

    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredNotebooks = notebooks.filter(notebook => notebook.title.toLowerCase().startsWith(searchTerm));

    filteredCount.textContent = `Notebooks with Title starting with '${searchTerm}': ${filteredNotebooks.length}`;
  }

  function searchNotebooks() {
    displayNotebooks();
    updateCounts();
  }

