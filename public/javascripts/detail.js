const webParam = new URLSearchParams(window.location.search);
const userEdit = webParam.get('isbn')

//book information
function details(isbn) {
	$.ajax('http://localhost:3000/api/books/' + isbn, {
		method: 'GET',
		success: function (data) {

			$('#lista').append(`
			<div class="listData">
				<div class="bookInfo">
					<div class="left">
						<img src= "${data.cover}"/>
					</div>
					<div class="right">
						<div class="authors"> ${data.authors} </div>
						<div class="title"> ${data.title} </div>
						<div class="subtitle"> ${data.subtitle} </div>
					</div>
				</div>
				<div class="description"> ${data.description} </div>
			</div>
				`)

		}
	})

}

details(userEdit)