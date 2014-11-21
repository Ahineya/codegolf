(function() {
    //console.log("Boilerplate works");

    window.socket = io();

    var SELECTORS = {
        'BTN_TEST': '.js-test',
        'BTN_APPLY': '.js-apply',
        'SYMBOLS_COUNTER': '.js-symbol-counter',
        'TASK_TITLE': '.js-task-title',
        'TASK_DESCRIPTION': '.js-task-description'
    };

    var editor = CodeMirror.fromTextArea($DW('#code').elements[0], {
        lineNumbers: true,
        extraKeys: {"Ctrl-Enter": function(instance) {
            testCode()
        }}
    });

    window.editor = editor;

    editor.on('keyup', function() {
        $DW(SELECTORS.BTN_APPLY).attr('disabled', 'disabled');
        $DW(SELECTORS.SYMBOLS_COUNTER).html('Symbols: '+editor.getValue().length);
    });

    $DW(SELECTORS.BTN_APPLY).attr('disabled', 'disabled');

    $DW(SELECTORS.BTN_TEST).bind('click', testCode);
    $DW(SELECTORS.BTN_APPLY).bind('click', function() {
        console.log(editor.getValue());
        var promise = $DW.ajax({
            method: 'GET',
            url: '/apply',
            data: {
                answer: editor.getValue()
            }
        });

        promise.then(function(data) {
            console.log(data);
        });

    });


    var task = getTask();

    $DW(SELECTORS.TASK_TITLE).html(task.title);
    $DW(SELECTORS.TASK_DESCRIPTION).html(task.task);

    function testCode() {

        console.clear();

        /*jshint ignore:start*/
        var userFunc = new Function( 'param', editor.getValue() );
        /*jshint ignore:end*/

        var pass = true;
        for (var i=0;i< task.tests.length; i++) {
            var result = userFunc.bind({})({
                str: task.tests[i].in[0]
            });

            if (result === task.tests[i].out[0]) {
                console.log('%cpassed test #' + i, 'color: #00ff00');
            } else {
                console.log('----------------------------------');
                console.log('%cnot passed test #' + i, 'color: #ff0000');
                console.log('in: ' + task.tests[i].in[0]);
                console.log('wanted: ' + task.tests[i].out[0]);
                console.log('got: ' + result);
                console.log('----------------------------------');
                pass = false;
                break;
            }
        }

        if (pass) {
            console.log('%csuccessfully passed all tests, you can apply your solution', 'color: #00ff00');
            $DW(SELECTORS.BTN_APPLY).attr('disabled', '');
        }

    }

    function getTask() {
        return {
            title: "Замена чисел в строке",
            task: "Необходимо написать тело функции, которая принимает параметр param: {str: \"sdf e34t s3\"} со " +
            "свойством str, которое является строкой символов. Функция должна вернуть новую строку, в которой все числа " +
            "увеличены на 1. Пример: вход: param: {str: \"sdf e34t s3\"}, выход: \"sdf e35t s4\"",
            tests: [
                {
                    in: ['jkshdfg 2345 l2l kjhb4nn'],
                    out: ['jkshdfg 2346 l3l kjhb5nn']
                },
                {
                    in: [', y7se gwt45 o'],
                    out: [', y8se gwt46 o']
                },
            ]
        }
    }

})();