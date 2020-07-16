require.config({paths: {'vs': '/static/external/monaco-editor/min/vs'}});

require(['vs/editor/editor.main'], function () {
    let $ = django.jQuery;

    // 实际的textarea
    let content = document.querySelector('textarea[use-monaco-editor="true"]')
    if (!content) {
        return
    }

    // 配置editor
    let editor = monaco.editor.create(document.getElementById('editor-id'), {
        automaticLayout: true,
        cursorBlinking: 'smooth',
        fontSize: '14px',
        language: 'markdown',
        lineNumbersMinChars: 3,
        minimap: {
            enabled: false
        },
        renderWhitespace: true,
        scrollbar: {
            alwaysConsumeMouseWheel: false,
            // horizontalHasArrows: true,
            horizontalScrollbarSize: '5px',
            // verticalHasArrows: true,
            verticalScrollbarSize: '5px',
        },
        // showFoldingControls: 'always'
        value: content.value,
    });

    // 通过marked插件将markdown转换成html
    marked.setOptions({
        breaks: true,
        smartLists: true,
        smartypants: true,
    });
    $("#preview-id").html(marked(content.value)); // 初始值
    $("#editor-id").bind('DOMNodeInserted', function () {
        $("#preview-id").html(marked(editor.getValue()));
    });

    // 监听提交表单操作，传值给实际的textarea
    let form = content.form;
    form.addEventListener('submit', function () {
        content.value = editor.getValue();
    });

    // 编辑、预展切换
    $('a.view-tab').click(function () {
        let view = $('.content-item').eq($(this).index());
        if (view.attr('id') === 'preview-id') {
            $('.custom-area').addClass('custom-area-preview');
        } else {
            $('.custom-area').removeClass('custom-area-preview');
            editor.layout();
        }
    });

    // 编辑器最大、最小化
    $('a.view-size').click(function () {
        if ($(this).text() === '最大化') {
            $('.custom-area').addClass('full-screen');
            $(this).text('最小化');
        } else {
            $('.custom-area').removeClass('full-screen');
            $(this).text('最大化');
        }
        editor.layout();
    });

    // 分屏展示
    $('a.view-divide').click(function () {
        if ($(this).text() === '分屏') {
            $('.custom-area').addClass('custom-area-divide');
            $('.custom-area .content').addClass('divided-content');
            $(this).text('还原');
        } else {
            $('.custom-area').removeClass('custom-area-divide');
            $('.custom-area .content').removeClass('divided-content');
            $(this).text('分屏');
        }
        editor.layout();
    });

    // 快捷操作
    function insertShortcut(selection, text) {
        let range = new monaco.Range(
            selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn)

        editor.executeEdits('', [{range: range, text: text, forceMoveMarkers: true}]);
    }

    $('.custom-area .shortcuts .bold').click(function () {
        let selection = editor.getSelection();
        let content = editor.getModel().getValueInRange(selection);
        insertShortcut(selection, '**' + content + '**');
    });

    $('.custom-area .shortcuts .italic').click(function () {
        let selection = editor.getSelection();
        let content = editor.getModel().getValueInRange(selection);
        insertShortcut(selection, '*' + content + '*');
    });

    $('.custom-area .shortcuts .underline').click(function () {
        let selection = editor.getSelection();
        let content = editor.getModel().getValueInRange(selection);
        insertShortcut(selection, '<u>' + content + '</u>');
    });

    $('.custom-area .shortcuts .line-between').click(function () {
        let selection = editor.getSelection();
        insertShortcut(selection, '\n -------- \n');
    });

    $('.custom-area .shortcuts .code').click(function () {
        let selection = editor.getSelection();
        let content = editor.getModel().getValueInRange(selection);
        insertShortcut(selection, '\n```\n' + content + '\n```\n');
    });

});

