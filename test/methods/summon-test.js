define(function (argument) {

	return function summonTest(data, options) {
		data.should.eql('test-data');

		options.should.eql({
			data: 'test-data'
		});
	};

});
