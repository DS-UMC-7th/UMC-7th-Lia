document.getElementById('task-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 

        const taskInput = document.getElementById('task-input');
        const taskValue = taskInput.value.trim();

        if (taskValue) {
            const todoList = document.getElementById('todo-list');

            const listItem = document.createElement('li');
            listItem.textContent = taskValue;
            listItem.classList.add('task-item');

            const doneButton = document.createElement('button');
            doneButton.textContent = '완료';
            doneButton.classList.add('done-button');
            listItem.appendChild(doneButton);

            todoList.appendChild(listItem);

            taskInput.value = '';

            doneButton.addEventListener('click', function() {
                const doneSection = document.querySelector('.done-section');

                const doneItem = document.createElement('li');
                doneItem.textContent = taskValue;
                doneItem.classList.add('task-item');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.classList.add('delete-button');
                doneItem.appendChild(deleteButton);

                doneSection.appendChild(doneItem);

                todoList.removeChild(listItem);

                deleteButton.addEventListener('click', function() {
                    doneSection.removeChild(doneItem);
                });
            });
        } else {
            alert('할 일을 입력하세요!'); 
        }
    }
});
