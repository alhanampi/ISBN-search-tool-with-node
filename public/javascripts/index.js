const webParam = new URLSearchParams(window.location.search);
const userEdit = webParam.get('isbn')


//basic book list
$.ajax('http://localhost:3000/api/books/')
	.done(function (data) {
		for (let i = 0; i < data.length; i++) {
			$('#table').append(`	
				<tr id="${data[i].isbn}" class="tableTr">
					<td> ${data[i].isbn} </td>
					<td> ${data[i].title} </td>
					<td><button class= "btn" id="detailButton onclick="details(${data[i].isbn}) type="button"> <a href="books/detail?isbn=${data[i].isbn}" type="button">Detalles </a> </button></td>
				</tr>
			`
			)
		}
	})
