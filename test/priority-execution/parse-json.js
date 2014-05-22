define(function () {

	return function (firstJSON) {

		var data = JSON.parse(firstJSON);

		data.should.eql({
			id: '1',
			name: 'first'
		})
	};
});
