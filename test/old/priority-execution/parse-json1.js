define(function () {

	return function (JSONStr) {

		var data = JSON.parse(JSONStr);

		data.should.eql({
			id: '2',
			name: 'second'
		})
	};
});
