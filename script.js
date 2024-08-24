document.addEventListener("DOMContentLoaded", () => {
    // Função para adicionar uma nova tarefa na coluna especificada
    function addTask(column) {
        const taskCount = column.querySelectorAll('.task').length + 1;
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.id = `task${taskCount}`;
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = `
            <span class="task-color-indicator" style="background-color: gray;"></span>
            <p contenteditable="true">Nova Tarefa</p>
            <div class="description" contenteditable="true">Descrição...</div>
            <button class="delete-task">×</button>
        `;

        const addTaskButton = column.querySelector('.add-task');
        column.insertBefore(newTask, addTaskButton);

        enableDragAndDrop(newTask);

        newTask.querySelector('.task-color-indicator').addEventListener('click', function () {
            const color = prompt("Digite a cor da urgência (ex: red, green, blue):", "gray");
            if (color) {
                this.style.backgroundColor = color;
            }
        });

        newTask.querySelector('.delete-task').addEventListener('click', function () {
            newTask.remove();
        });
    }

    // Função para habilitar drag-and-drop para tarefas
    function enableDragAndDrop(task) {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => e.target.classList.add('hide'), 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('hide');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('hovered');
    }

    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(id);
        const column = e.target.closest('.column');
        const addTaskButton = column.querySelector('.add-task');
        column.insertBefore(task, addTaskButton);
        column.classList.remove('hovered');
    }

    // Função para adicionar uma nova coluna
    function addColumn() {
        const newColumn = document.createElement('div');
        newColumn.className = 'column';
        newColumn.innerHTML = `
            <div class="column-header">
                <h2 contenteditable="true">Nova Coluna</h2>
                <button class="delete-column">×</button>
            </div>
            <button class="add-task">Adicionar Tarefa</button>
        `;
        document.querySelector('.task-board').insertBefore(newColumn, document.querySelector('.add-column'));

        newColumn.querySelector('.delete-column').addEventListener('click', deleteColumn);
        newColumn.querySelector('.add-task').addEventListener('click', () => addTask(newColumn));

        newColumn.addEventListener('dragover', dragOver);
        newColumn.addEventListener('dragenter', dragEnter);
        newColumn.addEventListener('dragleave', dragLeave);
        newColumn.addEventListener('drop', drop);
    }

    // Função para excluir uma coluna
    function deleteColumn(e) {
        const column = e.target.closest('.column');
        column.remove();
    }

    // Função de pesquisa de tarefas
    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.task p').forEach(task => {
            const taskText = task.textContent.toLowerCase();
            task.closest('.task').style.display = taskText.includes(searchTerm) ? '' : 'none';
        });
    });

    // Inicializa as colunas existentes
    document.querySelectorAll('.column').forEach(column => {
        column.querySelector('.add-task').addEventListener('click', () => addTask(column));
        column.querySelector('.delete-column').addEventListener('click', deleteColumn);
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    // Habilita a adição de colunas
    document.querySelector('.add-column-btn').addEventListener('click', addColumn);
});
