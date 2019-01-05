$('#bookButton').on('click', function () {
	const isbn = $('#bookCode').val()

	//ISBN search
	$.ajax('http://localhost:3000/books', {
		method: 'POST',
		data: { isbn: isbn },
		success: function () {
			location.href = '/books';
		},
		error: function () {
			alert('ese ISBN no arrojó resultados')
		}
	})
})