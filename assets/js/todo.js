var todos = [
	{todo: 'Input new todo above and enter', checked: false},
	{todo: 'Check out/in by clicking todo', checked: false},
	{todo: 'Remove todo by clicking the trash icon', checked: false}
]

let status = 'all';

function populateList(tasks) {
	for (let i=0; i<tasks.length; i++) {
		let hide = '';
		let todo = tasks[i];

		if (status === 'active') {
			if (todo['checked']) {
				hide = "style='display: none'";
			} 
		} else if (status === 'completed') {
			if (!todo['checked']) {
				hide = "style='display: none'"
			}
		}
		
		$('.list').append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>" + todo['todo'] + "</li>");
	}
}

function refreshList(tasks) {
	for (let i=0; i<tasks.length; i++) {
		let todo = tasks[i];
		
		$('.list li').eq(i).removeAttr('style');

		if (status === 'active') {
			if (todo['checked']) {
				$('.list li').eq(i).attr('style', 'display: none');
			} 
		} else if (status === 'completed') {
			if (!todo['checked']) {
				$('.list li').eq(i).attr('style', 'display: none');
			}
		}
	}
}

$('.list').on("click", "li", function() {
	const index = $(this).index();
	todos[index]['checked'] = !todos[index]['checked'];
	$(this).toggleClass("completed");
});

$('.list').on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		const index = $(this).index();
		todos.splice(index, 1);
		$(this).remove();
	});

	event.stopPropagation();
});

$('input[type="text"]').keypress(function(event) {
	if (event.which === 13) {
		var todoText = $(this).val();
		todos.push( {todo: todoText, checked: false} );
		$(this).val("");
		$('.list').append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>" + todos[todos.length-1]['todo'] + "</li>");
	}
});

$('.fa-plus').click(function() {
	$('input[type="text"]').fadeToggle();
});

$('#all').on('click', () => {
	status = 'all';
	refreshList(todos);
});

$('#active').on('click', () => {
	status = 'active';
	refreshList(todos);
})

$('#completed').on('click', () => {
	status='completed';
	refreshList(todos);
});

$(document).ready(
	() => populateList(todos)
);