define(function () {

	return function (firstJSON) {

		var data = JSON.parse(firstJSON);

		console.log(data);

		data.should.eql({
			id: '1',
			name: 'first'
		})
	};
});
