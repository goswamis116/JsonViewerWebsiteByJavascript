$(document).ready(function() {
    // Clear the textarea on page load
    $('#json-input').val('');
  
    $('#format-btn').click(function() {
      const input = $('#json-input').val();
      try {
        const parsedJson = JSON.parse(input);
        const formattedJson = JSON.stringify(parsedJson, null, 2);
        const highlightedJson = hljs.highlight(formattedJson, { language: 'json' }).value;
        $('#formatted-json').html('<pre><code class="json">' + highlightedJson + '</code></pre>');
  
        // Add the Copy button
        $('#formatted-json').append('<button id="copy-btn" class="btn btn-secondary btn-sm">Copy</button>');
  
        // Add Copy functionality
        $('#copy-btn').click(function() {
          const tempInput = $('<textarea>');
          $('body').append(tempInput);
          tempInput.val(formattedJson).select();
          document.execCommand('copy');
          tempInput.remove();
  
          // Provide feedback
          $(this).text('Copied!').removeClass('btn-secondary').addClass('btn-success');
  
          setTimeout(() => {
            $(this).text('Copy').removeClass('btn-success').addClass('btn-secondary');
          }, 2000);
        });
  
      } catch (error) {
        $('#formatted-json').text("Invalid JSON").css('color', 'red');
      }
    });
  });
  