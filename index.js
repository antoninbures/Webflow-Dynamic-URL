// Adjust domain names and paths for language based on the <html> lang attribute, 
// for all links with the "replace-host" attribute, considering the specifics of your staging/production setup.

$(document).ready(function() {
  // Determine the current language from the <html> element's lang attribute.
  var currentLang = $('html').attr('lang');
  var isEnglish = currentLang === 'en';

  $('a[replace-host="true"]').each(function() {
    var old_url = $(this).attr('href');
    var new_url = new URL(old_url, window.location.origin);

    // Determine the correct hostname and pathname adjustment based on environment and language.
    if(document.location.hostname.includes('webflow.io')) {
      // Staging environment.
      new_url.hostname = 'kampus-hybernska.webflow.io';
      if (isEnglish) {
        // Ensure the pathname includes '/en/' for English links on staging.
        new_url.pathname = '/en' + new_url.pathname.replace(/^\/?/, '/');
      }
    } else {
      // Production environment.
      new_url.hostname = 'kampushybernska.cz';
      if (isEnglish) {
        // Ensure the pathname includes '/en/' for English links on production.
        new_url.pathname = '/en' + new_url.pathname.replace(/^\/?/, '/');
      }
    }

    $(this).attr('href', new_url.toString());
  });
});
