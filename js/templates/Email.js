window.instanceOf = window.instanceOf || function(arg1, arg2) {return arg1 instanceof arg2;}; 
Coveo.TemplateCache.registerTemplate("CardEmailThread", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame coveo-email-result\">\n  <div class=\"coveo-result-row\" style=\"margin-bottom: 20px\">\n    <div class=\"coveo-result-cell\" style=\"width: 32px; vertical-align:middle; flex-grow:0\">\n      <span class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\"></span>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"padding-left: 10px; vertical-align: middle;\" role=\"heading\" aria-level=\"2\">\n      <a class=\"CoveoResultLink\"></a>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"margin-right: 10px\">\n      <div class=\"CoveoText\" data-value=\"From\" data-weight=\"bold\"></div>\n      <div class=\"CoveoFieldValue\" style=\"overflow: hidden; text-overflow: ellipsis;\" data-field=\"@from\" data-helper=\"email\" data-html-value=\"true\"></div>\n    </div>\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"To\" data-weight=\"bold\"></div>\n      <div class=\"CoveoFieldValue\" style=\"overflow: hidden; text-overflow: ellipsis;\" data-field=\"@recipients\" data-helper=\"email\" data-html-value=\"true\"></div>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n      <div class=\"CoveoText\" data-value=\"Description\" data-weight=\"bold\"> </div>\n      <span class=\"CoveoExcerpt\">\n      </span>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"Date\" data-weight=\"bold\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\" data-helper-options-always-include-time=\"true\"></div>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n      <span class=\"CoveoResultAttachments\" data-result-template-id=\"EmailResultAttachment\">\n      </span>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoMissingTerms\"></div>\n    </div>\n  </div>\n  <div class=\"CoveoCardActionBar\">\n    <div class=\"CoveoCardOverlay\" data-title=\"Replies\" data-icon=\"replies\">\n      <span class=\"CoveoResultFolding\" data-result-template-id=\"CardEmailChildResult\"></span>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":"card","fieldsToMatch":[{"field":"mailbox"}],"mobile":null,"role":null}),true, true)
Coveo.TemplateCache.registerTemplate("EmailThread", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame\">\n  <div class=\"coveo-result-cell\" style=\"vertical-align:top;text-align:center;width:32px;\">\n    <span class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\"></span>\n    <div class=\"CoveoQuickview\" data-template-id=\"EmailQuickviewContent\"></div>\n  </div>\n  <div class=\"coveo-result-cell\" style=\"vertical-align: top;padding-left: 16px;\">\n    <div class=\"coveo-result-row\" style=\"margin-top:0;\">\n      <div class=\"coveo-result-cell\" style=\"vertical-align:top;font-size:16px;\" role=\"heading\" aria-level=\"2\">\n        <a class=\"CoveoResultLink\"></a>\n      </div>\n      <div class=\"coveo-result-cell\" style=\"width:120px;text-align:right;font-size:12px\">\n        <div class=\"coveo-result-row\">\n          <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"date\"></span>\n        </div>\n      </div>\n    </div>\n    <div class=\"coveo-result-row\" style=\"margin-top:12px;\">\n      <div class=\"coveo-result-cell\">\n        <span class=\"CoveoFieldValue\" data-field=\"@from\" data-helper=\"email\" data-html-value=\"true\" data-text-caption=\"From:\" style=\"margin-right:30px;\"></span>\n        <span class=\"CoveoFieldValue\" data-field=\"@recipients\" data-helper=\"email\" data-html-value=\"true\" data-text-caption=\"To:\" style=\"margin-right:30px;\"></span>\n      </div>\n    </div>\n    <div class=\"coveo-result-row\" style=\"margin-top:12px;\">\n      <div class=\"coveo-result-cell\">\n        <span class=\"CoveoExcerpt\"></span>\n      </div>\n    </div>\n    <div class=\"coveo-result-row\" style=\"margin-top:12px;\">\n      <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px; font-size:13px;\">\n        <span class=\"CoveoResultAttachments\" data-result-template-id=\"EmailResultAttachment\">\n        </span>\n      </div>\n    </div>\n    <div class=\"coveo-result-row\" style=\"margin-top:12px;\">\n      <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px; font-size:13px;\">\n        <span class=\"CoveoResultFolding\" data-result-template-id=\"EmailChildResult\" data-more-caption=\"ShowAllReplies\" data-less-caption=\"ShowOnlyMostRelevantReplies\"></span>\n      </div>\n    </div>\n    <div class=\"coveo-result-row\">\n      <div class=\"coveo-result-cell\">\n        <div class=\"CoveoMissingTerms\"></div>\n      </div>\n    </div>\n  </div>\n</div>",{"condition":null,"layout":"list","fieldsToMatch":[{"field":"mailbox"}],"mobile":null,"role":null}),true, true)
Coveo.TemplateCache.registerTemplate("EmailResultAttachment", Coveo.HtmlTemplate.fromString("<div class=\"coveo-attachment-container\">\n    <div class=\"coveo-result-frame\">\n        <div class=\"coveo-result-row\">\n            <div class=\"coveo-result-cell\" style=\"width:60px;text-align: left;padding-right: 10px;\">\n                <img class=\"CoveoThumbnail\"/>\n            </div>\n            <div class=\"coveo-result-cell\">\n                <a class=\"CoveoResultLink\"></a>\n            </div>\n        </div>\n    </div>\n</div>\n",{"condition":null,"layout":null,"fieldsToMatch":null,"mobile":null,"role":null}),false, false)
Coveo.TemplateCache.registerTemplate("EmailQuickviewContent", Coveo.HtmlTemplate.fromString("<div class=\"coveo-quick-view-full-height\">\n    <div class=\"coveo-quick-view-header\">\n        <div class=\"coveo-email-from\">\n            From: <span class=\"CoveoFieldValue\" data-field=\"@from\" data-helper=\"email\" data-html-value=\"true\"></span>\n        </div>\n        <div class=\"coveo-email-to\">\n            To: <span class=\"CoveoFieldValue\" data-field=\"@recipients\" data-helper=\"email\" data-html-value=\"true\"></span>\n        </div>\n    </div>\n    <div class=\"CoveoEmailActions\"></div>\n    <div class=\"CoveoQuickviewDocument\"></div>\n</div>\n",{"condition":null,"layout":null,"fieldsToMatch":null,"mobile":null,"role":null}),false, false)
Coveo.TemplateCache.registerTemplate("EmailChildResult", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame coveo-email-result\">\n    <div class=\"coveo-result-row\">\n        <div class=\"coveo-result-cell\" style=\"width:50px;text-align:center;\">\n            <span class=\"CoveoIcon\" data-small=\"true\"></span>\n            <div class=\"CoveoQuickview\" data-template-id=\"EmailQuickviewContent\"></div>\n        </div>\n        <div class=\"coveo-result-cell\">\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"font-size:18px\">\n                    <a class=\"CoveoResultLink\"></a>\n                </div>\n                <div class=\"coveo-result-cell\" style=\"width:60px; text-align:right; font-size:12px\">\n                    <span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\"></span>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"font-size:13px;padding-top:5px;padding-bottom:5px;\">\n                    <span class=\"CoveoText\" data-value=\"From:\"></span>\n                    <span class=\"CoveoFieldValue\" data-field=\"@from\" data-helper=\"email\" data-html-value=\"true\"></span>\n                    <span class=\"CoveoText\" data-value=\"To:\"></span>\n                    <span class=\"CoveoFieldValue\" data-field=\"@recipients\" data-helper=\"email\" data-html-value=\"true\"></span>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n                    <span class=\"CoveoExcerpt\"></span>\n                </div>\n            </div>\n            <div class=\"coveo-result-row\">\n                <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n                    <span class=\"CoveoResultAttachments\" data-result-template-id=\"EmailResultAttachment\"></span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",{"condition":null,"layout":null,"fieldsToMatch":null,"mobile":null,"role":null}),false, false)
Coveo.TemplateCache.registerTemplate("CardEmailChildResult", Coveo.HtmlTemplate.fromString("<div class=\"coveo-result-frame coveo-email-result\" style=\"padding-top: 20px; padding-bottom: 20px\">\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-bottom:5px\">\n      <a class=\"CoveoResultLink\">\n      </a>\n    </div>\n    <div class=\"coveo-result-cell\" style=\"width: 30px; padding-left: 6px\">\n      <div class=\"CoveoQuickview\">\n        <span class=\"coveo-sprites-quickview\">\n        </span>\n      </div>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\" style=\"margin-top: 3px; margin-bottom: 3px;\">\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"emailDateTime\" style=\"font-size: 12px\">\n      </div>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\">\n    <div class=\"coveo-result-cell\" style=\"padding-top:5px; padding-bottom:5px\">\n      <span class=\"CoveoExcerpt\">\n      </span>\n    </div>\n  </div>\n  <div class=\"coveo-result-row\" style=\"margin-top: 10px\">\n    <div class=\"coveo-result-cell\" style=\"margin-right: 10px\">\n      <div class=\"CoveoText\" data-value=\"From\" data-size=\"13px\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@from\" data-helper=\"email\" data-html-value=\"true\" style=\"overflow: hidden; text-overflow: ellipsis;\"></div>\n    </div>\n    <div class=\"coveo-result-cell\">\n      <div class=\"CoveoText\" data-value=\"To\" data-size=\"13px\"></div>\n      <div class=\"CoveoFieldValue\" data-field=\"@recipients\" data-helper=\"email\" data-html-value=\"true\" style=\"overflow: hidden; text-overflow: ellipsis;\"></div>\n    </div>\n  </div>\n</div>\n",{"condition":null,"layout":null,"fieldsToMatch":null,"mobile":null,"role":null}),false, false)