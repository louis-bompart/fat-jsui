window.instanceOf = window.instanceOf || function(arg1, arg2) {return arg1 instanceof arg2;}; 
webpackJsonpCoveo__temporary([15,17],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(7);
var ResultList_1 = __webpack_require__(87);
var Dom_1 = __webpack_require__(1);
var underscore_1 = __webpack_require__(0);
var Logger_1 = __webpack_require__(9);
var ResultListUtils = /** @class */ (function () {
    function ResultListUtils() {
    }
    ResultListUtils.hideIfInfiniteScrollEnabled = function (cmp) {
        var infiniteScrollEnabled = ResultListUtils.isInfiniteScrollEnabled(cmp.searchInterface.element);
        if (infiniteScrollEnabled) {
            cmp.disable();
            Dom_1.$$(cmp.element).hide();
            ResultListUtils.warnIfComponentNotNeeded(cmp);
        }
        else {
            cmp.enable();
            Dom_1.$$(cmp.element).unhide();
        }
    };
    ResultListUtils.isInfiniteScrollEnabled = function (root) {
        var resultList = ResultListUtils.getActiveResultList(root);
        return resultList ? !!resultList.options.enableInfiniteScroll : false;
    };
    ResultListUtils.scrollToTop = function (root) {
        var resultList = ResultListUtils.getActiveResultList(root);
        if (!resultList) {
            new Logger_1.Logger(this).warn('No active ResultList, scrolling to the top of the Window');
            return window.scrollTo(0, 0);
        }
        var searchInterfacePosition = resultList.searchInterface.element.getBoundingClientRect().top;
        if (searchInterfacePosition > 0) {
            return;
        }
        var scrollContainer = resultList.options.infiniteScrollContainer;
        if (typeof scrollContainer.scrollTo === 'function') {
            scrollContainer.scrollTo(0, window.pageYOffset + searchInterfacePosition);
        }
        else {
            scrollContainer.scrollTop = 0;
        }
    };
    ResultListUtils.getActiveResultList = function (root) {
        var resultLists = ResultListUtils.getResultLists(root);
        return underscore_1.find(resultLists, function (resultList) { return !resultList.disabled; });
    };
    ResultListUtils.getResultLists = function (root) {
        return Dom_1.$$(root)
            .findAll("." + ResultListUtils.cssClass())
            .map(function (el) { return Component_1.Component.get(el, ResultList_1.ResultList); });
    };
    ResultListUtils.cssClass = function () {
        return Component_1.Component.computeCssClassName(ResultList_1.ResultList);
    };
    ResultListUtils.warnIfComponentNotNeeded = function (cmp) {
        var root = cmp.searchInterface.root;
        var allListsUseInfiniteScroll = ResultListUtils.allResultListsUseInfiniteScroll(root);
        allListsUseInfiniteScroll && ResultListUtils.notNeededComponentWarning(cmp);
    };
    ResultListUtils.allResultListsUseInfiniteScroll = function (root) {
        var listsWithInfiniteScrollDisabled = ResultListUtils.getResultLists(root).filter(function (resultList) { return !resultList.options.enableInfiniteScroll; });
        return listsWithInfiniteScrollDisabled.length === 0;
    };
    ResultListUtils.notNeededComponentWarning = function (cmp) {
        var cmpCssClass = Component_1.Component.computeCssClassNameForType(cmp.type);
        var message = "The " + cmpCssClass + " component is not needed because all " + ResultListUtils.cssClass() + " components have enableInfiniteScroll set to 'true'.\n    For the best performance, remove the " + cmpCssClass + " component from your search page.";
        new Logger_1.Logger(cmp).warn(message);
    };
    return ResultListUtils;
}());
exports.ResultListUtils = ResultListUtils;


/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(7);
var _ = __webpack_require__(0);
var ResultListRenderer = /** @class */ (function () {
    function ResultListRenderer(resultListOptions, autoCreateComponentsFn) {
        this.resultListOptions = resultListOptions;
        this.autoCreateComponentsFn = autoCreateComponentsFn;
    }
    ResultListRenderer.prototype.renderResults = function (resultElements, append, resultDisplayedCallback) {
        var _this = this;
        if (append === void 0) { append = false; }
        return Promise.all([this.getStartFragment(resultElements, append), this.getEndFragment(resultElements, append)]).then(function (_a) {
            var startFrag = _a[0], endFrag = _a[1];
            var resultsFragment = document.createDocumentFragment();
            if (startFrag) {
                resultsFragment.appendChild(startFrag);
            }
            _.each(resultElements, function (resultElement) {
                resultsFragment.appendChild(resultElement);
                resultDisplayedCallback(Component_1.Component.getResult(resultElement), resultElement);
            });
            if (endFrag) {
                resultsFragment.appendChild(endFrag);
            }
            _this.resultListOptions.resultsContainer.appendChild(resultsFragment);
        });
    };
    ResultListRenderer.prototype.getStartFragment = function (resultElements, append) {
        return Promise.resolve(document.createDocumentFragment());
    };
    ResultListRenderer.prototype.getEndFragment = function (resultElements, append) {
        return Promise.resolve(document.createDocumentFragment());
    };
    return ResultListRenderer;
}());
exports.ResultListRenderer = ResultListRenderer;


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(630);
var QueryEvents_1 = __webpack_require__(11);
var ResultListEvents_1 = __webpack_require__(29);
var GlobalExports_1 = __webpack_require__(3);
var Assert_1 = __webpack_require__(5);
var Model_1 = __webpack_require__(18);
var QueryStateModel_1 = __webpack_require__(13);
var Strings_1 = __webpack_require__(6);
var AccessibleButton_1 = __webpack_require__(15);
var DeviceUtils_1 = __webpack_require__(24);
var Dom_1 = __webpack_require__(1);
var ResultListUtils_1 = __webpack_require__(111);
var SVGDom_1 = __webpack_require__(16);
var SVGIcons_1 = __webpack_require__(12);
var AnalyticsActionListMeta_1 = __webpack_require__(10);
var Component_1 = __webpack_require__(7);
var ComponentOptions_1 = __webpack_require__(8);
var Initialization_1 = __webpack_require__(2);
/**
 * The Pager component attaches itself to a `div` element and renders widgets that allow the end user to navigate
 * through the different result pages.
 *
 * This component takes care of triggering a query with the correct result range whenever the end user selects a page or
 * uses the navigation buttons (**Previous** and **Next**).
 */
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    /**
     * Creates a new Pager. Binds multiple query events ({@link QueryEvents.newQuery}, {@link QueryEvents.buildingQuery},
     * {@link QueryEvents.querySuccess}, {@link QueryEvents.queryError} and {@link QueryEvents.noResults}. Renders itself
     * on every query success.
     * @param element The HTMLElement on which to instantiate the component (normally a `div`).
     * @param options The options for the Pager component.
     * @param bindings The bindings that the component requires to function normally. If not set, these will be
     * automatically resolved (with a slower execution time).
     */
    function Pager(element, options, bindings) {
        var _this = _super.call(this, element, Pager.ID, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.listenToQueryStateChange = true;
        _this.ignoreNextQuerySuccess = false;
        // The normal behavior of this component is to reset to page 1 when a new
        // query is performed by other components (i.e. not pagers).
        //
        // This behavior is overridden when the 'first' state is
        // programmatically modified.
        _this.needToReset = true;
        _this.options = ComponentOptions_1.ComponentOptions.initComponentOptions(element, Pager, options);
        _this.currentPage = 1;
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.newQuery, function (args) { return _this.handleNewQuery(args); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.querySuccess, function (args) { return _this.handleQuerySuccess(args); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.queryError, function () { return _this.handleQueryError(); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.noResults, function (args) { return _this.handleNoResults(args); });
        _this.bind.onQueryState(Model_1.MODEL_EVENTS.CHANGE_ONE, QueryStateModel_1.QUERY_STATE_ATTRIBUTES.FIRST, function (data) {
            return _this.handleQueryStateFirstResultChanged(data);
        });
        _this.bind.onQueryState(Model_1.MODEL_EVENTS.CHANGE_ONE, QueryStateModel_1.QUERY_STATE_ATTRIBUTES.NUMBER_OF_RESULTS, function (data) {
            return _this.handleQueryStateNumberOfResultsPerPageChanged(data);
        });
        _this.addAlwaysActiveListeners();
        _this.list = Dom_1.$$('ul', {
            className: 'coveo-pager-list',
            role: 'navigation',
            ariaLabel: Strings_1.l('Pagination')
        }).el;
        element.appendChild(_this.list);
        return _this;
    }
    Object.defineProperty(Pager.prototype, "currentPage", {
        /**
         * The current page (1-based index).
         */
        get: function () {
            return this._currentPage;
        },
        set: function (value) {
            var sanitizedValue = value;
            if (isNaN(value)) {
                this.logger.warn("Unable to set pager current page to an invalid value: " + value + ". Resetting to 1.");
                sanitizedValue = 1;
            }
            sanitizedValue = Math.max(Math.min(sanitizedValue, this.getMaxNumberOfPagesForCurrentResultsPerPage()), 1);
            sanitizedValue = Math.floor(sanitizedValue);
            this._currentPage = sanitizedValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the current page, then executes a query.
     *
     * Also logs an event in the usage analytics (`pageNumber` by default) with the new current page number as meta data.
     *
     * @param pageNumber The page number to navigate to.
     * @param analyticCause The event to log in the usage analytics.
     */
    Pager.prototype.setPage = function (pageNumber, analyticCause) {
        if (analyticCause === void 0) { analyticCause = AnalyticsActionListMeta_1.analyticsActionCauseList.pagerNumber; }
        Assert_1.Assert.exists(pageNumber);
        this.currentPage = pageNumber;
        this.updateQueryStateModel(this.getFirstResultNumber(this.currentPage));
        this.usageAnalytics.logCustomEvent(analyticCause, { pagerNumber: this.currentPage }, this.element);
        this.queryController.executeQuery({
            ignoreWarningSearchEvent: true,
            keepLastSearchUid: true,
            origin: this
        });
    };
    /**
     * Navigates to the previous page, then executes a query.
     *
     * Also logs the `pagePrevious` event in the usage analytics with the new current page number as meta data.
     */
    Pager.prototype.previousPage = function () {
        this.setPage(this.currentPage - 1, AnalyticsActionListMeta_1.analyticsActionCauseList.pagerPrevious);
    };
    /**
     * Navigates to the next page, then executes a query.
     *
     * Also logs the `pageNext` event in the usage analytics with the new current page number as meta data.
     */
    Pager.prototype.nextPage = function () {
        this.setPage(this.currentPage + 1, AnalyticsActionListMeta_1.analyticsActionCauseList.pagerNext);
    };
    Pager.prototype.addAlwaysActiveListeners = function () {
        var _this = this;
        this.searchInterface.element.addEventListener(ResultListEvents_1.ResultListEvents.newResultsDisplayed, function () {
            return ResultListUtils_1.ResultListUtils.hideIfInfiniteScrollEnabled(_this);
        });
    };
    Pager.prototype.getMaxNumberOfPagesForCurrentResultsPerPage = function () {
        return Math.ceil(this.options.maximumNumberOfResultsFromIndex / this.searchInterface.resultsPerPage);
    };
    Pager.prototype.handleNewQuery = function (data) {
        var triggeredByPagerOrDebugMode = data && data.origin && (data.origin.type == Pager.ID || data.origin.type == 'Debug');
        if (this.needToReset && !triggeredByPagerOrDebugMode) {
            this.currentPage = 1;
            this.updateQueryStateModel(this.getFirstResultNumber(this.currentPage));
        }
        this.needToReset = true;
    };
    Pager.prototype.updateQueryStateModel = function (attrValue) {
        this.listenToQueryStateChange = false;
        this.queryStateModel.set(QueryStateModel_1.QueryStateModel.attributesEnum.first, attrValue);
        this.listenToQueryStateChange = true;
    };
    Pager.prototype.handleQueryError = function () {
        this.reset();
    };
    Pager.prototype.handleQuerySuccess = function (data) {
        var _this = this;
        this.reset();
        if (this.ignoreNextQuerySuccess) {
            this.ignoreNextQuerySuccess = false;
        }
        else {
            Assert_1.Assert.isNotUndefined(data);
            var firstResult = data.query.firstResult;
            var count = data.results.totalCountFiltered;
            var pagerBoundary = this.computePagerBoundary(firstResult, count);
            this.currentPage = pagerBoundary.currentPage;
            if (pagerBoundary.end - pagerBoundary.start > 0) {
                var _loop_1 = function (i) {
                    var listItemValue = Dom_1.$$('a', {
                        className: 'coveo-pager-list-item-text coveo-pager-anchor',
                        tabindex: -1,
                        ariaHidden: 'true'
                    }, i.toString(10)).el;
                    var page = i;
                    var listItem = Dom_1.$$('li', {
                        className: 'coveo-pager-list-item',
                        tabindex: 0
                    }).el;
                    var isCurrentPage = page === this_1.currentPage;
                    if (isCurrentPage) {
                        Dom_1.$$(listItem).addClass('coveo-active');
                    }
                    Dom_1.$$(listItem).setAttribute('aria-pressed', isCurrentPage.toString());
                    var clickAction = function () { return _this.handleClickPage(page); };
                    new AccessibleButton_1.AccessibleButton()
                        .withElement(listItem)
                        .withLabel(Strings_1.l('PageNumber', i.toString(10)))
                        .withClickAction(clickAction)
                        .withEnterKeyboardAction(clickAction)
                        .build();
                    listItem.appendChild(listItemValue);
                    this_1.list.appendChild(listItem);
                };
                var this_1 = this;
                for (var i = pagerBoundary.start; i <= pagerBoundary.end; i++) {
                    _loop_1(i);
                }
                if (this.options.enableNavigationButton && pagerBoundary.lastResultPage > 1) {
                    this.renderNavigationButton(pagerBoundary);
                }
            }
        }
    };
    Pager.prototype.handleNoResults = function (data) {
        var lastValidPage;
        if (data.results.totalCount > 0) {
            // First scenario : The index returned less results than expected (because of folding).
            // Recalculate the last valid page, and change to that new page.
            var possibleValidPage = this.computePagerBoundary(data.results.totalCountFiltered, data.results.totalCount).lastResultPage;
            if (this.currentPage > possibleValidPage) {
                lastValidPage = possibleValidPage;
            }
        }
        else if (this.currentPage > this.getMaxNumberOfPagesForCurrentResultsPerPage()) {
            // Second scenario : Someone tried to access a non-valid page by the URL for example, which is  higher than the current possible with the number of
            // possible results. The last valid page will be the maximum number of results avaiable from the index.
            lastValidPage = this.getMaxNumberOfPagesForCurrentResultsPerPage();
        }
        // This needs to be deferred because we still want all the "querySuccess" callbacks the complete their execution
        // before triggering/queuing the next query;
        // if we cannot find a lastValidPage to go to, do nothing : this means it's a query that simply return nothing.
        if (lastValidPage != null) {
            this.currentPage = lastValidPage;
            data.retryTheQuery = true;
            this.needToReset = false;
            this.ignoreNextQuerySuccess = false;
            this.updateQueryStateModel(this.getFirstResultNumber(this.currentPage));
        }
    };
    Pager.prototype.reset = function () {
        Dom_1.$$(this.list).empty();
    };
    Pager.prototype.handleBuildingQuery = function (data) {
        Assert_1.Assert.exists(data);
        var eventArgs = this.getQueryEventArgs();
        data.queryBuilder.firstResult = eventArgs.first;
        // Set the number of results only if it was not already set by external code
        // Most of the time this will be set by either : the SearchInterface with the resultsPerPage option
        // Or by the ResultsPerPage component (so the end user decides).
        // Pager will realistically never set this value itself.
        if (data.queryBuilder.numberOfResults == null) {
            data.queryBuilder.numberOfResults = eventArgs.count;
        }
        var maxResultNumber = data.queryBuilder.firstResult + data.queryBuilder.numberOfResults;
        var numOfExcessResults = Math.max(0, maxResultNumber - this.options.maximumNumberOfResultsFromIndex);
        data.queryBuilder.numberOfResults -= numOfExcessResults;
    };
    Pager.prototype.computePagerBoundary = function (firstResult, totalCount) {
        var resultPerPage = this.searchInterface.resultsPerPage;
        var currentPage = Math.floor(firstResult / resultPerPage) + 1;
        var lastPageNumber = Math.min(Math.ceil(totalCount / resultPerPage), this.getMaxNumberOfPagesForCurrentResultsPerPage());
        lastPageNumber = Math.max(lastPageNumber, 1);
        var halfLength = Math.floor(this.options.numberOfPages / 2);
        var firstPageNumber = currentPage - halfLength;
        firstPageNumber = Math.max(firstPageNumber, 1);
        var endPageNumber = firstPageNumber + this.options.numberOfPages - 1;
        endPageNumber = Math.min(endPageNumber, lastPageNumber);
        return {
            start: firstPageNumber,
            end: endPageNumber,
            lastResultPage: lastPageNumber,
            currentPage: currentPage
        };
    };
    Pager.prototype.renderNavigationButton = function (pagerBoundary) {
        if (this.currentPage > 1) {
            var previous = this.renderPreviousButton();
            this.list.insertBefore(previous.el, this.list.firstChild);
        }
        if (this.currentPage < pagerBoundary.lastResultPage) {
            var next = this.renderNextButton();
            this.list.appendChild(next.el);
        }
    };
    Pager.prototype.renderPreviousButton = function () {
        var _this = this;
        var previousButton = Dom_1.$$('li', {
            className: 'coveo-pager-previous coveo-pager-anchor coveo-pager-list-item'
        });
        var previousLink = Dom_1.$$('a', {
            title: Strings_1.l('Previous'),
            tabindex: -1,
            ariaHidden: 'true'
        });
        var previousIcon = Dom_1.$$('span', {
            className: 'coveo-pager-previous-icon'
        }, SVGIcons_1.SVGIcons.icons.pagerLeftArrow);
        SVGDom_1.SVGDom.addClassToSVGInContainer(previousIcon.el, 'coveo-pager-previous-icon-svg');
        previousLink.append(previousIcon.el);
        previousButton.append(previousLink.el);
        new AccessibleButton_1.AccessibleButton()
            .withElement(previousButton)
            .withLabel(Strings_1.l('Previous'))
            .withSelectAction(function () { return _this.handleClickPrevious(); })
            .build();
        return previousButton;
    };
    Pager.prototype.renderNextButton = function () {
        var _this = this;
        var nextButton = Dom_1.$$('li', {
            className: 'coveo-pager-next coveo-pager-anchor coveo-pager-list-item'
        });
        var nextLink = Dom_1.$$('a', {
            title: Strings_1.l('Next'),
            tabindex: -1,
            ariaHidden: 'true'
        });
        var nextIcon = Dom_1.$$('span', {
            className: 'coveo-pager-next-icon'
        }, SVGIcons_1.SVGIcons.icons.pagerRightArrow);
        SVGDom_1.SVGDom.addClassToSVGInContainer(nextIcon.el, 'coveo-pager-next-icon-svg');
        nextLink.append(nextIcon.el);
        nextButton.append(nextLink.el);
        new AccessibleButton_1.AccessibleButton()
            .withElement(nextButton)
            .withLabel(Strings_1.l('Next'))
            .withSelectAction(function () { return _this.handleClickNext(); })
            .build();
        return nextButton;
    };
    Pager.prototype.handleQueryStateFirstResultChanged = function (data) {
        if (!this.listenToQueryStateChange) {
            return;
        }
        Assert_1.Assert.exists(data);
        this.needToReset = false;
        var firstResult = data.value;
        this.currentPage = this.fromFirstResultsToPageNumber(firstResult);
    };
    Pager.prototype.handleQueryStateNumberOfResultsPerPageChanged = function (data) {
        var firstResult = this.queryStateModel.get(QueryStateModel_1.QUERY_STATE_ATTRIBUTES.FIRST);
        this.searchInterface.resultsPerPage = data.value;
        this.currentPage = this.fromFirstResultsToPageNumber(firstResult);
    };
    Pager.prototype.handleClickPage = function (pageNumber) {
        Assert_1.Assert.exists(pageNumber);
        this.setPage(pageNumber);
    };
    Pager.prototype.handleClickPrevious = function () {
        this.previousPage();
    };
    Pager.prototype.handleClickNext = function () {
        this.nextPage();
    };
    Pager.prototype.fromFirstResultsToPageNumber = function (firstResult) {
        return firstResult / this.searchInterface.resultsPerPage + 1;
    };
    Pager.prototype.getFirstResultNumber = function (pageNumber) {
        if (pageNumber === void 0) { pageNumber = this.currentPage; }
        return (pageNumber - 1) * this.searchInterface.resultsPerPage;
    };
    Pager.prototype.getQueryEventArgs = function () {
        return {
            count: this.searchInterface.resultsPerPage,
            first: this.getFirstResultNumber()
        };
    };
    Pager.ID = 'Pager';
    Pager.doExport = function () {
        GlobalExports_1.exportGlobally({
            Pager: Pager
        });
    };
    /**
     * The options for the Pager
     * @componentOptions
     */
    Pager.options = {
        /**
         * Specifies how many page links to display in the pager.
         *
         * Default value is `5` on a desktop computers and `3` on a mobile device. Minimum value is `1`.
         */
        numberOfPages: ComponentOptions_1.ComponentOptions.buildNumberOption({
            defaultFunction: function () {
                if (DeviceUtils_1.DeviceUtils.isMobileDevice()) {
                    return 3;
                }
                else {
                    return 5;
                }
            },
            min: 1
        }),
        /**
         * Specifies whether the **Previous** and **Next** buttons should appear at each end of the pager when appropriate.
         *
         * The default value is `true`.
         */
        enableNavigationButton: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: true }),
        /**
         * Specifies the maximum number of pages to display if enough results are available.
         *
         * This property is typically set when the default number of accessible results from the index has been changed from its default value of `1000` (10 results per page X 100 `maxNumberOfPages`).
         * Default value is `100`
         *
         * @deprecated This is a deprecated option. The `Pager` now automatically adapts itself on each new query, so you no longer need to specify a value for this option. However, if the default maximum number of accessible results value was changed on your Coveo index, you should use the [`maximumNumberOfResultsFromIndex`]{@link Pager.options.maximumNumberOfResultsFromIndex} option to specify the new value.
         */
        maxNumberOfPages: ComponentOptions_1.ComponentOptions.buildNumberOption({
            defaultValue: undefined,
            deprecated: 'This is a deprecated option. The pager will automatically adapt itself on each new query. You no longer need to specify this option. Use maximumNumberOfResultsFromIndex instead.'
        }),
        /**
         * Specifies the maximum number of results that the index can return for any query.
         *
         * Default value is `1000` in a Coveo index.
         *
         * If this value was modified in your Coveo index, you must specify the new value in this option for the Pager component to work properly
         */
        maximumNumberOfResultsFromIndex: ComponentOptions_1.ComponentOptions.buildNumberOption({
            defaultValue: 1000
        })
    };
    return Pager;
}(Component_1.Component));
exports.Pager = Pager;
Initialization_1.Initialization.registerAutoCreateComponent(Pager);


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Facet.ts' />
var StringUtils_1 = __webpack_require__(20);
var QueryUtils_1 = __webpack_require__(23);
var FileTypes_1 = __webpack_require__(113);
var DateUtils_1 = __webpack_require__(32);
var Utils_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var _ = __webpack_require__(0);
var Strings_1 = __webpack_require__(6);
var FacetUtils = /** @class */ (function () {
    function FacetUtils() {
    }
    FacetUtils.getRegexToUseForFacetSearch = function (value, ignoreAccent) {
        return new RegExp(StringUtils_1.StringUtils.stringToRegex(value, ignoreAccent), 'i');
    };
    FacetUtils.getDisplayValueFromValueCaption = function (value, field, valueCaption) {
        var returnValue = this.tryToGetTranslatedCaption(field, value);
        return valueCaption[value] || returnValue;
    };
    FacetUtils.getValuesToUseForSearchInFacet = function (original, facet) {
        var ret = [original];
        var regex = this.getRegexToUseForFacetSearch(original, facet.options.facetSearchIgnoreAccents);
        if (facet.options.valueCaption) {
            _.chain(facet.options.valueCaption)
                .pairs()
                .filter(function (pair) {
                return regex.test(pair[1]);
            })
                .each(function (match) {
                ret.push(match[0]);
            });
            if (QueryUtils_1.QueryUtils.isStratusAgnosticField(facet.options.field, '@objecttype') ||
                QueryUtils_1.QueryUtils.isStratusAgnosticField(facet.options.field, '@filetype')) {
                _.each(FileTypes_1.FileTypes.getFileTypeCaptions(), function (value, key) {
                    if (!(key in facet.options.valueCaption) && regex.test(value)) {
                        ret.push(key);
                    }
                });
            }
        }
        else if (QueryUtils_1.QueryUtils.isStratusAgnosticField(facet.options.field, '@objecttype') ||
            QueryUtils_1.QueryUtils.isStratusAgnosticField(facet.options.field, '@filetype')) {
            _.each(_.filter(_.pairs(FileTypes_1.FileTypes.getFileTypeCaptions()), function (pair) {
                return regex.test(pair[1]);
            }), function (match) {
                ret.push(match[0]);
            });
        }
        else if (QueryUtils_1.QueryUtils.isStratusAgnosticField(facet.options.field, '@month')) {
            _.each(_.range(1, 13), function (month) {
                if (regex.test(DateUtils_1.DateUtils.monthToString(month - 1))) {
                    ret.push(('0' + month.toString()).substr(-2));
                }
            });
        }
        return ret;
    };
    FacetUtils.buildFacetSearchPattern = function (values) {
        values = _.map(values, function (value) {
            return Utils_1.Utils.escapeRegexCharacter(value);
        });
        values[0] = '.*' + values[0] + '.*';
        return values.join('|');
    };
    FacetUtils.needAnotherFacetSearch = function (currentSearchLength, newSearchLength, oldSearchLength, desiredSearchLength) {
        // Something was removed (currentSearch < newSearch)
        // && we might want to display more facet search result(currentSearch < desiredSearch)
        // && the new query returned more stuff than the old one so there's still more results(currentSearchLength > oldLength)
        return currentSearchLength < newSearchLength && currentSearchLength < desiredSearchLength && currentSearchLength > oldSearchLength;
    };
    FacetUtils.addNoStateCssClassToFacetValues = function (facet, container) {
        // This takes care of adding the correct css class on each facet value checkbox (empty white box) if at least one value is selected in that facet
        if (facet.values.getSelected().length != 0) {
            var noStates = Dom_1.$$(container).findAll('li:not(.coveo-selected)');
            _.each(noStates, function (noState) {
                Dom_1.$$(noState).addClass('coveo-no-state');
            });
        }
    };
    FacetUtils.tryToGetTranslatedCaption = function (field, value) {
        var found;
        if (QueryUtils_1.QueryUtils.isStratusAgnosticField(field.toLowerCase(), '@filetype')) {
            found = FileTypes_1.FileTypes.getFileType(value).caption;
        }
        else if (QueryUtils_1.QueryUtils.isStratusAgnosticField(field.toLowerCase(), '@objecttype')) {
            found = FileTypes_1.FileTypes.getObjectType(value).caption;
        }
        else if (FacetUtils.isMonthFieldValue(field, value)) {
            var month = parseInt(value, 10);
            found = DateUtils_1.DateUtils.monthToString(month - 1);
        }
        else {
            found = Strings_1.l(value);
        }
        return found != undefined && Utils_1.Utils.isNonEmptyString(found) ? found : value;
    };
    FacetUtils.isMonthFieldValue = function (field, value) {
        if (!QueryUtils_1.QueryUtils.isStratusAgnosticField(field.toLowerCase(), '@month')) {
            return false;
        }
        var asInt = parseInt(value, 10);
        if (isNaN(asInt)) {
            return false;
        }
        if (asInt < 1 || asInt > 12) {
            return false;
        }
        return true;
    };
    return FacetUtils;
}());
exports.FacetUtils = FacetUtils;


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Template_1 = __webpack_require__(27);
var TemplateList_1 = __webpack_require__(90);
var _ = __webpack_require__(0);
var TableTemplate = /** @class */ (function (_super) {
    __extends(TableTemplate, _super);
    function TableTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultTemplate = "<td><a class=\"CoveoResultLink\"></a></td>\n                             <td><span class=\"CoveoExcerpt\"></span></td>\n                             <td><span class=\"CoveoFieldValue\" data-field=\"@date\" data-helper=\"date\"></span></td>";
        _this.defaultRoledTemplates = {
            'table-header': "<th style=\"width: 40%\">Link</th>\n                     <th>Excerpt</th>\n                     <th style=\"width: 20%\"\n                         class=\"CoveoSort coveo-table-header-sort\"\n                         data-sort-criteria=\"date ascending,date descending\"\n                         data-display-unselected-icon=\"false\">Date</th>",
            'table-footer': "<th>Link</th>\n                     <th>Excerpt</th>\n                     <th>Date</th>"
        };
        return _this;
    }
    TableTemplate.prototype.instantiateRoleToString = function (role) {
        var roledTemplate = _.find(this.templates, function (t) { return t.role === role; });
        if (roledTemplate) {
            return roledTemplate.instantiateToString(undefined, {});
        }
        else {
            return this.defaultRoledTemplates[role];
        }
    };
    TableTemplate.prototype.instantiateRoleToElement = function (role) {
        var _this = this;
        var roledTemplate = _.find(this.templates, function (t) { return t.role === role; });
        if (roledTemplate) {
            return roledTemplate.instantiateToElement(undefined, {});
        }
        else {
            var tmpl = new Template_1.Template(function () { return _this.defaultRoledTemplates[role]; });
            tmpl.layout = 'table';
            return tmpl.instantiateToElement(undefined);
        }
    };
    TableTemplate.prototype.getFallbackTemplate = function () {
        var _this = this;
        return new Template_1.Template(function () { return _this.defaultTemplate; });
    };
    TableTemplate.prototype.hasTemplateWithRole = function (role) {
        return _.find(this.templates, function (t) { return t.role === role; });
    };
    return TableTemplate;
}(TemplateList_1.TemplateList));
exports.TableTemplate = TableTemplate;


/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Template_1 = __webpack_require__(27);
var DefaultRecommendationTemplate = /** @class */ (function (_super) {
    __extends(DefaultRecommendationTemplate, _super);
    function DefaultRecommendationTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultRecommendationTemplate.prototype.instantiateToString = function (object) {
        var template = "<div class=\"coveo-result-frame\">\n        <div class=\"coveo-result-row\">\n          <div class=\"coveo-result-cell\" style=\"width:40px;text-align:center;vertical-align:middle;\">\n            <span class=\"CoveoIcon\" data-small=\"true\" data-with-label=\"false\">\n            </span>\n          </div>\n          <div class=\"coveo-result-cell\" style=\"padding:0 0 3px 5px;vertical-align:middle\">\n            <div class=\"coveo-result-row\">\n              <div class=\"coveo-result-cell\" style=\"font-size:10pt;\">\n                <a class=\"CoveoResultLink\" style=\"display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>";
        return template;
    };
    DefaultRecommendationTemplate.prototype.instantiateToElement = function (object) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var div = document.createElement('div');
            div.innerHTML = _this.instantiateToString(object);
            resolve(div);
        });
    };
    return DefaultRecommendationTemplate;
}(Template_1.Template));
exports.DefaultRecommendationTemplate = DefaultRecommendationTemplate;


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __webpack_require__(21);
var ResultList_1 = __webpack_require__(87);
var underscore_1 = __webpack_require__(0);
var Dom_1 = __webpack_require__(1);
var Logger_1 = __webpack_require__(9);
var TemplateToHtml = /** @class */ (function () {
    function TemplateToHtml(args) {
        this.args = args;
    }
    TemplateToHtml.prototype.buildResults = function (results, layout, currentlyDisplayedResults) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res, resultsPromises;
            return __generator(this, function (_a) {
                res = [];
                resultsPromises = underscore_1.map(results.results, function (result, index) {
                    return _this.buildResult(result, layout, currentlyDisplayedResults).then(function (resultElement) {
                        if (resultElement != null) {
                            res.push({ elem: resultElement, idx: index });
                        }
                        ResultList_1.ResultList.resultCurrentlyBeingRendered = null;
                        return resultElement;
                    });
                });
                // We need to sort by the original index order, because in lazy loading mode, it's possible that results does not gets rendered
                // in the correct order returned by the index, depending on the time it takes to load all the results component for a given result template
                return [2 /*return*/, Promise.all(resultsPromises).then(function () {
                        return underscore_1.pluck(underscore_1.sortBy(res, 'idx'), 'elem');
                    })];
            });
        });
    };
    TemplateToHtml.prototype.buildResult = function (result, layout, currentlyDisplayedResults) {
        return __awaiter(this, void 0, void 0, function () {
            var resultElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Core_1.Assert.exists(result);
                        Core_1.QueryUtils.setStateObjectOnQueryResult(this.args.queryStateModel.get(), result);
                        Core_1.QueryUtils.setSearchInterfaceObjectOnQueryResult(this.args.searchInterface, result);
                        ResultList_1.ResultList.resultCurrentlyBeingRendered = result;
                        return [4 /*yield*/, this.createHtmlElement(result, layout)];
                    case 1:
                        resultElement = _a.sent();
                        if (resultElement != null) {
                            Core_1.Component.bindResultToElement(resultElement, result);
                        }
                        currentlyDisplayedResults.push(result);
                        return [4 /*yield*/, this.autoCreateComponentsInsideResult(resultElement, result).initResult];
                    case 2:
                        _a.sent();
                        this.verifyChildren(resultElement);
                        return [2 /*return*/, resultElement];
                }
            });
        });
    };
    TemplateToHtml.prototype.autoCreateComponentsInsideResult = function (element, result) {
        Core_1.Assert.exists(element);
        return Core_1.Initialization.automaticallyCreateComponentsInsideResult(element, result);
    };
    TemplateToHtml.prototype.createHtmlElement = function (result, layout) {
        return this.args.resultTemplate.instantiateToElement(result, {
            wrapInDiv: true,
            checkCondition: true,
            currentLayout: layout,
            responsiveComponents: this.args.searchInterface.responsiveComponents
        });
    };
    TemplateToHtml.prototype.verifyChildren = function (element) {
        var containsResultLink = !!Dom_1.$$(element).find('.CoveoResultLink');
        if (containsResultLink) {
            return;
        }
        var msg = "Result does not contain a \"CoveoResultLink\" component, please verify the result template";
        new Logger_1.Logger(element).warn(msg, this.args.resultTemplate);
    };
    return TemplateToHtml;
}());
exports.TemplateToHtml = TemplateToHtml;


/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateHelpers_1 = __webpack_require__(115);
var HighlightUtils_1 = __webpack_require__(67);
var DateUtils_1 = __webpack_require__(32);
var CurrencyUtils_1 = __webpack_require__(129);
var HtmlUtils_1 = __webpack_require__(177);
var Utils_1 = __webpack_require__(4);
var StringUtils_1 = __webpack_require__(20);
var TimeSpanUtils_1 = __webpack_require__(69);
var EmailUtils_1 = __webpack_require__(176);
var QueryUtils_1 = __webpack_require__(23);
var DeviceUtils_1 = __webpack_require__(24);
var Dom_1 = __webpack_require__(1);
var SearchEndpoint_1 = __webpack_require__(50);
var StreamHighlightUtils_1 = __webpack_require__(114);
var FacetUtils_1 = __webpack_require__(39);
var Globalize = __webpack_require__(22);
var _ = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var TemplateCache_1 = __webpack_require__(65);
var CoreHelpers = /** @class */ (function () {
    function CoreHelpers() {
    }
    /**
     * For backward compatibility reason, the "global" template helper should be available under the
     * coveo namespace.
     * @param scope
     */
    CoreHelpers.exportAllHelpersGlobally = function (scope) {
        _.each(TemplateHelpers_1.TemplateHelpers.getHelpers(), function (helper, name) {
            if (scope[name] == undefined) {
                scope[name] = helper;
            }
        });
    };
    return CoreHelpers;
}());
exports.CoreHelpers = CoreHelpers;
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('javascriptEncode', function (value) {
    return Utils_1.Utils.exists(value) ? StringUtils_1.StringUtils.javascriptEncode(value) : undefined;
});
var executeShorten = function (content, options) {
    var strAndHoles = HighlightUtils_1.StringAndHoles.shortenString(content, options.length, '...');
    if (Utils_1.Utils.exists(options.highlights)) {
        return HighlightUtils_1.HighlightUtils.highlightString(strAndHoles.value, options.highlights, strAndHoles.holes, options.cssClass || 'highlight');
    }
    else {
        return strAndHoles.value;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('shorten', function (content, length, highlights, cssClass) {
    return executeShorten(content, {
        length: length,
        highlights: highlights,
        cssClass: cssClass
    });
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('shortenv2', function (content, options) {
    return executeShorten(content, options);
});
var executeShortenPath = function (content, options) {
    var strAndHoles = HighlightUtils_1.StringAndHoles.shortenPath(content, options.length);
    if (Utils_1.Utils.exists(options.highlights)) {
        return HighlightUtils_1.HighlightUtils.highlightString(strAndHoles.value, options.highlights, strAndHoles.holes, options.cssClass || 'highlight');
    }
    else {
        return strAndHoles.value;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('shortenPath', function (content, length, highlights, cssClass) {
    return executeShortenPath(content, {
        length: length,
        highlights: highlights,
        cssClass: cssClass
    });
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('shortenPathv2', function (content, options) {
    return executeShortenPath(content, options);
});
var executeShortenUri = function (content, options) {
    var strAndHoles = HighlightUtils_1.StringAndHoles.shortenUri(content, options.length);
    if (Utils_1.Utils.exists(options.highlights)) {
        return HighlightUtils_1.HighlightUtils.highlightString(strAndHoles.value, options.highlights, strAndHoles.holes, options.cssClass || 'highlight');
    }
    else {
        return strAndHoles.value;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('shortenUri', function (content, length, highlights, cssClass) {
    return executeShortenUri(content, {
        length: length,
        highlights: highlights,
        cssClass: cssClass
    });
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('shortenUriv2', function (content, options) {
    return executeShortenUri(content, options);
});
var executeHighlight = function (content, options) {
    if (Utils_1.Utils.exists(content)) {
        if (Utils_1.Utils.exists(options.highlights)) {
            return HighlightUtils_1.HighlightUtils.highlightString(content, options.highlights, null, options.cssClass || 'highlight');
        }
        else {
            return content;
        }
    }
    else {
        return undefined;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlight', function (content, highlights, cssClass) {
    return executeHighlight(content, {
        highlights: highlights,
        cssClass: cssClass
    });
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlightv2', function (content, options) {
    return executeHighlight(content, options);
});
var executeHighlightStreamText = function (content, options) {
    if (Utils_1.Utils.exists(content) && Utils_1.Utils.exists(options.termsToHighlight) && Utils_1.Utils.exists(options.phrasesToHighlight)) {
        if (termsToHighlightAreDefined(options.termsToHighlight, options.phrasesToHighlight)) {
            return StreamHighlightUtils_1.StreamHighlightUtils.highlightStreamText(content, options.termsToHighlight, options.phrasesToHighlight, options.opts);
        }
        else {
            return content;
        }
    }
    else {
        return undefined;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlightStreamText', function (content, termsToHighlight, phrasesToHighlight, opts) {
    if (termsToHighlight === void 0) { termsToHighlight = resolveTermsToHighlight(); }
    if (phrasesToHighlight === void 0) { phrasesToHighlight = resolvePhrasesToHighlight(); }
    return executeHighlightStreamText(content, {
        termsToHighlight: termsToHighlight,
        phrasesToHighlight: phrasesToHighlight,
        opts: opts
    });
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlightStreamTextv2', function (content, options) {
    var mergedOptions = __assign({ termsToHighlight: resolveTermsToHighlight(), phrasesToHighlight: resolvePhrasesToHighlight() }, options);
    return executeHighlightStreamText(content, mergedOptions);
});
var executeHighlightStreamHTML = function (content, options) {
    if (Utils_1.Utils.exists(content) && Utils_1.Utils.exists(options.termsToHighlight) && Utils_1.Utils.exists(options.phrasesToHighlight)) {
        if (termsToHighlightAreDefined(options.termsToHighlight, options.phrasesToHighlight)) {
            return StreamHighlightUtils_1.StreamHighlightUtils.highlightStreamHTML(content, options.termsToHighlight, options.phrasesToHighlight, options.opts);
        }
        else {
            return content;
        }
    }
    else {
        return undefined;
    }
};
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlightStreamHTML', function (content, termsToHighlight, phrasesToHighlight, opts) {
    if (termsToHighlight === void 0) { termsToHighlight = resolveTermsToHighlight(); }
    if (phrasesToHighlight === void 0) { phrasesToHighlight = resolvePhrasesToHighlight(); }
    return executeHighlightStreamHTML(content, {
        termsToHighlight: termsToHighlight,
        phrasesToHighlight: phrasesToHighlight,
        opts: opts
    });
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('highlightStreamHTMLv2', function (content, options) {
    var mergedOptions = __assign({ termsToHighlight: resolveTermsToHighlight(), phrasesToHighlight: resolvePhrasesToHighlight() }, options);
    return executeHighlightStreamHTML(content, mergedOptions);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('number', function (value, options) {
    if (!Utils_1.Utils.exists(value)) {
        return undefined;
    }
    var numberValue = Number(value);
    var format = _.isString(options) ? options : options && options.format;
    if (!format) {
        return StringUtils_1.StringUtils.htmlEncode(numberValue.toString());
    }
    return StringUtils_1.StringUtils.htmlEncode(Globalize.format(numberValue, format));
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('date', function (value, options) {
    return DateUtils_1.DateUtils.dateToString(DateUtils_1.DateUtils.convertFromJsonDateIfNeeded(value), options);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('time', function (value, options) {
    return DateUtils_1.DateUtils.timeToString(DateUtils_1.DateUtils.convertFromJsonDateIfNeeded(value), options);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('dateTime', function (value, options) {
    return DateUtils_1.DateUtils.dateTimeToString(DateUtils_1.DateUtils.convertFromJsonDateIfNeeded(value), options);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('emailDateTime', function (value, options) {
    var defaultOptions = {};
    defaultOptions.includeTimeIfThisWeek = true;
    var optionsToUse = _.extend(options, defaultOptions);
    return value ? DateUtils_1.DateUtils.dateTimeToString(DateUtils_1.DateUtils.convertFromJsonDateIfNeeded(value), optionsToUse) : undefined;
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('currency', function (value, options) {
    return CurrencyUtils_1.CurrencyUtils.currencyToString(value, options);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('timeSpan', function (value, options) {
    if (options === void 0) { options = { isMilliseconds: false }; }
    return new TimeSpanUtils_1.TimeSpan(value, options.isMilliseconds).getHHMMSS();
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('email', function (value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // support old arguments (value: any, companyDomain: string, me: string, lengthLimit = 2, truncateName = false)
    var companyDomain;
    var me;
    var lengthLimit;
    var truncateName;
    if (_.isObject(args[0])) {
        companyDomain = args[0]['companyDomain'];
        me = args[0]['me'];
        lengthLimit = args[0]['lengthLimit'];
        truncateName = args[0]['truncateName'];
    }
    else {
        companyDomain = args[0];
        me = args[1];
        lengthLimit = args[2];
        truncateName = args[3];
    }
    if (lengthLimit == undefined) {
        lengthLimit = 2;
    }
    if (truncateName == undefined) {
        truncateName = false;
    }
    if (_.isString(value)) {
        var listOfAddresses = EmailUtils_1.EmailUtils.splitSemicolonSeparatedListOfEmailAddresses(value);
        return EmailUtils_1.EmailUtils.emailAddressesToHyperlinks(listOfAddresses, companyDomain, me, lengthLimit, truncateName);
    }
    else if (_.isArray(value)) {
        return EmailUtils_1.EmailUtils.emailAddressesToHyperlinks(value, companyDomain, me, lengthLimit, truncateName);
    }
    else {
        return undefined;
    }
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('excessEmailToggle', function (target) {
    Dom_1.$$(target).removeClass('coveo-active');
    if (Dom_1.$$(target).hasClass('coveo-emails-excess-collapsed')) {
        _.each(Dom_1.$$(target).siblings('.coveo-emails-excess-expanded'), function (sibling) {
            Dom_1.$$(sibling).addClass('coveo-active');
        });
    }
    else if (Dom_1.$$(target).hasClass('coveo-hide-expanded')) {
        Dom_1.$$(target.parentElement).addClass('coveo-inactive');
        _.each(Dom_1.$$(target.parentElement).siblings('.coveo-emails-excess-collapsed'), function (sibling) {
            Dom_1.$$(sibling).addClass('coveo-active');
        });
    }
    return undefined;
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('anchor', function (href, options) {
    return HtmlUtils_1.AnchorUtils.buildAnchor(href, options);
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('image', function (src, options, result) {
    if (result === void 0) { result = resolveQueryResult(); }
    if (options && options.srcTemplate) {
        return HtmlUtils_1.ImageUtils.buildImage(StringUtils_1.StringUtils.buildStringTemplateFromResult(options.srcTemplate, result), {
            alt: options.alt,
            height: options.height,
            width: options.width
        });
    }
    return HtmlUtils_1.ImageUtils.buildImage(src, options);
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('thumbnail', function (result, endpoint, options) {
    if (result === void 0) { result = resolveQueryResult(); }
    if (endpoint === void 0) { endpoint = 'default'; }
    if (QueryUtils_1.QueryUtils.hasThumbnail(result)) {
        return HtmlUtils_1.ImageUtils.buildImageFromResult(result, SearchEndpoint_1.SearchEndpoint.endpoints[endpoint], options);
    }
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('fromFileTypeToIcon', function (result, options) {
    if (result === void 0) { result = resolveQueryResult(); }
    if (options === void 0) { options = {}; }
    var icon = Component_1.Component.getComponentRef('Icon');
    if (icon) {
        return icon.createIcon(result, options).outerHTML;
    }
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('attrEncode', function (value) {
    return ('' + value) /* Forces the conversion to string. */
        .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
        .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
        .replace(/'/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('loadTemplates', function (templatesToLoad, once) {
    if (once === void 0) { once = true; }
    var ret = '';
    var data = resolveQueryResult();
    var atLeastOneWasLoaded = false;
    var toLoad = templatesToLoad;
    var defaultTmpl;
    _.each(templatesToLoad, function (value, key, obj) {
        if (value == 'default') {
            defaultTmpl = key;
        }
    });
    if (defaultTmpl != undefined) {
        toLoad = _.omit(templatesToLoad, defaultTmpl);
    }
    _.each(toLoad, function (condition, id, obj) {
        if (!atLeastOneWasLoaded || !once) {
            atLeastOneWasLoaded = atLeastOneWasLoaded || condition;
            ret += TemplateHelpers_1.TemplateHelpers.getHelper('loadTemplate')(id, condition, data);
        }
    });
    if (!atLeastOneWasLoaded && defaultTmpl != undefined) {
        ret += TemplateHelpers_1.TemplateHelpers.getHelper('loadTemplate')(defaultTmpl, true, data);
    }
    return ret;
});
var byteMeasure = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('size', function (value, options) {
    var size = parseInt(value, 10);
    var precision = options != null && options.precision != null ? options.precision : 2;
    var base = options != null && options.base != null ? options.base : 0;
    while (size > 1024 && base + 1 < byteMeasure.length) {
        size /= 1024;
        base++;
    }
    size = Math.floor(size * Math.pow(10, precision)) / Math.pow(10, precision);
    return size + ' ' + byteMeasure[base];
});
TemplateHelpers_1.TemplateHelpers.registerFieldHelper('translatedCaption', function (value) {
    return FacetUtils_1.FacetUtils.tryToGetTranslatedCaption('@filetype', value);
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('loadTemplate', function (id, condition, data) {
    if (condition === void 0) { condition = true; }
    if (Utils_1.Utils.isNullOrUndefined(data)) {
        data = resolveQueryResult();
    }
    if (condition) {
        return TemplateCache_1.TemplateCache.getTemplate(id).instantiateToString(data, {
            checkCondition: false
        });
    }
    return '';
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('encodeCarriageReturn', function (data) {
    if (Utils_1.Utils.isNullOrUndefined(data)) {
        return undefined;
    }
    else {
        return StringUtils_1.StringUtils.encodeCarriageReturn(data);
    }
});
TemplateHelpers_1.TemplateHelpers.registerTemplateHelper('isMobileDevice', function () {
    return DeviceUtils_1.DeviceUtils.isMobileDevice() ? DeviceUtils_1.DeviceUtils.getDeviceName() : null;
});
function resolveQueryResult() {
    var found;
    var resultList = Component_1.Component.getComponentRef('ResultList');
    if (resultList) {
        found = resultList.resultCurrentlyBeingRendered;
    }
    if (!found) {
        var quickview = Component_1.Component.getComponentRef('Quickview');
        if (quickview) {
            found = quickview.resultCurrentlyBeingRendered;
        }
    }
    return found;
}
function resolveTermsToHighlight() {
    var currentQueryResult = resolveQueryResult();
    if (currentQueryResult) {
        return currentQueryResult.termsToHighlight;
    }
}
function resolvePhrasesToHighlight() {
    var currentQueryResult = resolveQueryResult();
    if (currentQueryResult) {
        return currentQueryResult.phrasesToHighlight;
    }
}
function termsToHighlightAreDefined(termsToHighlight, phrasesToHighlight) {
    return Utils_1.Utils.isNonEmptyArray(_.keys(termsToHighlight)) || Utils_1.Utils.isNonEmptyArray(_.keys(phrasesToHighlight));
}


/***/ }),

/***/ 521:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 522:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResponsiveComponentsManager_1 = __webpack_require__(60);
var SearchInterface_1 = __webpack_require__(19);
var ResultList_1 = __webpack_require__(87);
var Dom_1 = __webpack_require__(1);
var Component_1 = __webpack_require__(7);
var Logger_1 = __webpack_require__(9);
var ResponsiveDefaultResultTemplate = /** @class */ (function () {
    function ResponsiveDefaultResultTemplate(coveoRoot, ID, options, responsiveDropdown) {
        this.coveoRoot = coveoRoot;
        this.ID = ID;
        this.searchInterface = Component_1.Component.get(this.coveoRoot.el, SearchInterface_1.SearchInterface, false);
        this.currentMode = 'large';
    }
    ResponsiveDefaultResultTemplate.init = function (root, component, options) {
        if (!Dom_1.$$(root).find("." + Component_1.Component.computeCssClassName(ResultList_1.ResultList))) {
            var logger = new Logger_1.Logger('ResponsiveDefaultResultTemplate');
            logger.trace('No ResultLayout component found : Cannot instantiate ResponsiveResultLayout');
            return;
        }
        ResponsiveComponentsManager_1.ResponsiveComponentsManager.register(ResponsiveDefaultResultTemplate, Dom_1.$$(root), ResultList_1.ResultList.ID, component, options);
    };
    ResponsiveDefaultResultTemplate.prototype.registerComponent = function (accept) {
        if (accept instanceof ResultList_1.ResultList) {
            this.resultList = accept;
            return true;
        }
        return false;
    };
    ResponsiveDefaultResultTemplate.prototype.handleResizeEvent = function () {
        var _this = this;
        var lastResults = this.resultList.queryController.getLastResults();
        if (this.needSmallMode()) {
            Dom_1.$$(this.resultList.options.resultsContainer).addClass('coveo-card-layout-container');
            Dom_1.$$(this.resultList.options.resultsContainer).removeClass("coveo-list-layout-container");
            if (this.currentMode != 'small') {
                if (lastResults) {
                    this.resultList.buildResults(lastResults).then(function (elements) {
                        _this.resultList.renderResults(elements);
                    });
                }
                this.currentMode = 'small';
            }
        }
        else {
            Dom_1.$$(this.resultList.options.resultsContainer).removeClass('coveo-card-layout-container');
            Dom_1.$$(this.resultList.options.resultsContainer).addClass("coveo-list-layout-container");
            if (this.currentMode != 'large') {
                if (lastResults) {
                    this.resultList.buildResults(lastResults).then(function (elements) {
                        _this.resultList.renderResults(elements);
                    });
                }
                this.currentMode = 'large';
            }
        }
    };
    ResponsiveDefaultResultTemplate.prototype.needSmallMode = function () {
        return this.coveoRoot.width() <= this.searchInterface.responsiveComponents.getSmallScreenWidth();
    };
    return ResponsiveDefaultResultTemplate;
}());
exports.ResponsiveDefaultResultTemplate = ResponsiveDefaultResultTemplate;


/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var ResultContainer = /** @class */ (function () {
    function ResultContainer(resultContainer, searchInterface) {
        this.searchInterface = searchInterface;
        this.resultContainerElement = Dom_1.$$(resultContainer);
    }
    ResultContainer.prototype.empty = function () {
        this.searchInterface.detachComponentsInside(this.resultContainerElement.el);
        Dom_1.$$(this.resultContainerElement).empty();
    };
    ResultContainer.prototype.addClass = function (classToAdd) {
        this.resultContainerElement.addClass(classToAdd);
    };
    ResultContainer.prototype.isEmpty = function () {
        return this.resultContainerElement.isEmpty();
    };
    ResultContainer.prototype.hideChildren = function () {
        this.resultContainerElement.children().forEach(function (child) { return Dom_1.$$(child).hide(); });
    };
    ResultContainer.prototype.getResultElements = function () {
        return this.resultContainerElement.findAll('.CoveoResult');
    };
    Object.defineProperty(ResultContainer.prototype, "el", {
        get: function () {
            return this.resultContainerElement.el;
        },
        enumerable: true,
        configurable: true
    });
    ResultContainer.resultCurrentlyBeingRendered = null;
    return ResultContainer;
}());
exports.ResultContainer = ResultContainer;


/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResultListRenderer_1 = __webpack_require__(209);
var Dom_1 = __webpack_require__(1);
var _ = __webpack_require__(0);
var ResultListCardRenderer = /** @class */ (function (_super) {
    __extends(ResultListCardRenderer, _super);
    function ResultListCardRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultListCardRenderer.prototype.getEndFragment = function (resultElements) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_.isEmpty(resultElements)) {
                // with infinite scrolling, we want the additional results to append at the end of the previous query.
                // For this, we need to remove the padding.
                if (_this.resultListOptions.enableInfiniteScroll) {
                    var needToBeRemoved = Dom_1.$$(_this.resultListOptions.resultsContainer).findAll('.coveo-card-layout-padding');
                    _.each(needToBeRemoved, function (toRemove) { return Dom_1.$$(toRemove).remove(); });
                }
                // Used to prevent last card from spanning the grid's whole width
                var emptyCards_1 = document.createDocumentFragment();
                _.times(3, function () { return emptyCards_1.appendChild(Dom_1.$$('div', { className: 'coveo-card-layout coveo-card-layout-padding' }).el); });
                resolve(emptyCards_1);
            }
            resolve(null);
        });
    };
    return ResultListCardRenderer;
}(ResultListRenderer_1.ResultListRenderer));
exports.ResultListCardRenderer = ResultListCardRenderer;


/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResultListRenderer_1 = __webpack_require__(209);
var TableTemplate_1 = __webpack_require__(461);
var Dom_1 = __webpack_require__(1);
var _ = __webpack_require__(0);
var ResultListTableRenderer = /** @class */ (function (_super) {
    __extends(ResultListTableRenderer, _super);
    function ResultListTableRenderer(resultListOptions, autoCreateComponentsFn) {
        var _this = _super.call(this, resultListOptions, autoCreateComponentsFn) || this;
        _this.resultListOptions = resultListOptions;
        _this.autoCreateComponentsFn = autoCreateComponentsFn;
        _this.shouldDisplayHeader = true;
        _this.shouldDisplayFooter = false;
        if (_this.resultListOptions.resultTemplate instanceof TableTemplate_1.TableTemplate) {
            if (_this.resultListOptions.resultTemplate.hasTemplateWithRole('table-footer')) {
                _this.shouldDisplayFooter = true;
            }
            // If custom templates are defined but no header template, do not display it.
            if (_this.resultListOptions.resultTemplate.templates.length !== 0 &&
                !_this.resultListOptions.resultTemplate.hasTemplateWithRole('table-header')) {
                _this.shouldDisplayHeader = false;
            }
        }
        return _this;
    }
    ResultListTableRenderer.prototype.getStartFragment = function (resultElements, append) {
        if (!append && !_.isEmpty(resultElements) && this.shouldDisplayHeader) {
            return this.renderRoledTemplate('table-header');
        }
    };
    ResultListTableRenderer.prototype.getEndFragment = function (resultElements, append) {
        if (!append && !_.isEmpty(resultElements) && this.shouldDisplayFooter) {
            return this.renderRoledTemplate('table-footer');
        }
    };
    ResultListTableRenderer.prototype.renderRoledTemplate = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, frag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resultListOptions.resultTemplate.instantiateRoleToElement(role)];
                    case 1:
                        elem = _a.sent();
                        Dom_1.$$(elem).addClass("coveo-result-list-" + role);
                        this.autoCreateComponentsFn(elem, undefined);
                        frag = document.createDocumentFragment();
                        frag.appendChild(elem);
                        return [2 /*return*/, frag];
                }
            });
        });
    };
    return ResultListTableRenderer;
}(ResultListRenderer_1.ResultListRenderer));
exports.ResultListTableRenderer = ResultListTableRenderer;


/***/ }),

/***/ 630:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(521);
__webpack_require__(522);
__webpack_require__(523);
var underscore_1 = __webpack_require__(0);
var QueryEvents_1 = __webpack_require__(11);
var ResultLayoutEvents_1 = __webpack_require__(128);
var ResultListEvents_1 = __webpack_require__(29);
var GlobalExports_1 = __webpack_require__(3);
var Assert_1 = __webpack_require__(5);
var Defer_1 = __webpack_require__(31);
var Model_1 = __webpack_require__(18);
var QueryStateModel_1 = __webpack_require__(13);
var DeviceUtils_1 = __webpack_require__(24);
var Dom_1 = __webpack_require__(1);
var DomUtils_1 = __webpack_require__(91);
var Utils_1 = __webpack_require__(4);
var AnalyticsActionListMeta_1 = __webpack_require__(10);
var Component_1 = __webpack_require__(7);
var ComponentOptions_1 = __webpack_require__(8);
var Initialization_1 = __webpack_require__(2);
var InitializationPlaceholder_1 = __webpack_require__(175);
var TemplateComponentOptions_1 = __webpack_require__(61);
var ResponsiveDefaultResultTemplate_1 = __webpack_require__(524);
var CoreHelpers_1 = __webpack_require__(465);
var DefaultRecommendationTemplate_1 = __webpack_require__(462);
var DefaultResultTemplate_1 = __webpack_require__(116);
var TableTemplate_1 = __webpack_require__(461);
var TemplateCache_1 = __webpack_require__(65);
var TemplateList_1 = __webpack_require__(90);
var ResultContainer_1 = __webpack_require__(525);
var ResultListCardRenderer_1 = __webpack_require__(526);
var ResultListRenderer_1 = __webpack_require__(209);
var ResultListTableRenderer_1 = __webpack_require__(527);
var ResultListUtils_1 = __webpack_require__(111);
var TemplateToHtml_1 = __webpack_require__(463);
CoreHelpers_1.CoreHelpers.exportAllHelpersGlobally(window['Coveo']);
/**
 * The `ResultList` component is responsible for displaying query results by applying one or several result templates
 * (see [Result Templates](https://docs.coveo.com/en/413/)).
 *
 * It is possible to include multiple `ResultList` components along with a single `ResultLayout`
 * component in a search page to provide different result layouts (see
 * [Result Layouts](https://docs.coveo.com/en/360/)).
 *
 * This component supports infinite scrolling (see the
 * [`enableInfiniteScroll`]{@link ResultList.options.enableInfiniteScroll} option).
 */
var ResultList = /** @class */ (function (_super) {
    __extends(ResultList, _super);
    /**
     * Creates a new `ResultList` component. Binds various event related to queries (e.g., on querySuccess ->
     * renderResults). Binds scroll event if the [`enableInfiniteScroll`]{@link ResultList.options.enableInfiniteScroll}
     * option is `true`.
     * @param element The HTMLElement on which to instantiate the component.
     * @param options The options for the `ResultList` component.
     * @param bindings The bindings that the component requires to function normally. If not set, these will be
     * automatically resolved (with a slower execution time).
     * @param elementClassId The class that this component should instantiate. Components that extend the base ResultList
     * use this. Default value is `CoveoResultList`.
     */
    function ResultList(element, options, bindings, elementClassId) {
        if (elementClassId === void 0) { elementClassId = ResultList.ID; }
        var _this = _super.call(this, element, elementClassId, bindings) || this;
        _this.element = element;
        _this.options = options;
        _this.bindings = bindings;
        _this.currentlyDisplayedResults = [];
        _this.reachedTheEndOfResults = false;
        _this.disableLayoutChange = false;
        // This variable serves to block some setup where the framework fails to correctly identify the "real" scrolling container.
        // Since it's not technically feasible to correctly identify the scrolling container in every possible scenario without some very complex logic, we instead try to add some kind of mechanism to
        // block runaway requests where UI will keep asking more results in the index, eventually bringing the browser to it's knee.
        // Those successive request are needed in "displayMoreResults" to ensure we fill the scrolling container correctly.
        // Since the container is not identified correctly, it is never "full", so we keep asking for more.
        // It is reset every time the user actually scroll the container manually.
        _this.successiveScrollCount = 0;
        _this.options = ComponentOptions_1.ComponentOptions.initComponentOptions(element, ResultList, options);
        Assert_1.Assert.exists(element);
        Assert_1.Assert.exists(_this.options);
        Assert_1.Assert.exists(_this.options.resultTemplate);
        Assert_1.Assert.exists(_this.options.infiniteScrollContainer);
        _this.showOrHideElementsDependingOnState(false, false);
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.newQuery, function (args) { return _this.handleNewQuery(); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.buildingQuery, function (args) {
            return _this.handleBuildingQuery(args);
        });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.querySuccess, function (args) {
            return _this.handleQuerySuccess(args);
        });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.duringQuery, function (args) { return _this.handleDuringQuery(); });
        _this.bind.onRootElement(QueryEvents_1.QueryEvents.queryError, function (args) { return _this.handleQueryError(); });
        Dom_1.$$(_this.root).on(ResultListEvents_1.ResultListEvents.changeLayout, function (e, args) { return _this.handleChangeLayout(args); });
        if (_this.options.enableInfiniteScroll) {
            _this.handlePageChanged();
            _this.bind.on(_this.options.infiniteScrollContainer, 'scroll', function (e) {
                _this.successiveScrollCount = 0;
                _this.handleScrollOfResultList();
            });
        }
        _this.bind.onQueryState(Model_1.MODEL_EVENTS.CHANGE_ONE, QueryStateModel_1.QUERY_STATE_ATTRIBUTES.FIRST, function () { return _this.handlePageChanged(); });
        _this.resultContainer = _this.initResultContainer();
        Assert_1.Assert.exists(_this.options.resultsContainer);
        _this.initWaitAnimationContainer();
        Assert_1.Assert.exists(_this.options.waitAnimationContainer);
        _this.setupTemplatesVersusLayouts();
        Dom_1.$$(_this.root).on(ResultLayoutEvents_1.ResultLayoutEvents.populateResultLayout, function (e, args) {
            return args.layouts.push(_this.options.layout);
        });
        _this.setupRenderer();
        _this.makeElementFocusable();
        _this.ensureHasId();
        return _this;
    }
    ResultList.getDefaultTemplate = function (e) {
        var template = ResultList.loadTemplatesFromCache();
        if (template != null) {
            return template;
        }
        var component = Component_1.Component.get(e);
        if (Coveo['Recommendation'] && component.searchInterface instanceof Coveo['Recommendation']) {
            return new DefaultRecommendationTemplate_1.DefaultRecommendationTemplate();
        }
        return new DefaultResultTemplate_1.DefaultResultTemplate();
    };
    ResultList.loadTemplatesFromCache = function () {
        var pageTemplateNames = TemplateCache_1.TemplateCache.getResultListTemplateNames();
        if (pageTemplateNames.length > 0) {
            return new TemplateList_1.TemplateList(underscore_1.compact(underscore_1.map(pageTemplateNames, function (templateName) { return TemplateCache_1.TemplateCache.getTemplate(templateName); })));
        }
        return null;
    };
    /**
     * Get the fields needed to be automatically included in the query for this result list.
     * @returns {string[]}
     */
    ResultList.prototype.getAutoSelectedFieldsToInclude = function () {
        return underscore_1.chain(this.options.resultTemplate.getFields()).concat(this.getMinimalFieldsToInclude()).compact().unique().value();
    };
    ResultList.prototype.setupTemplatesVersusLayouts = function () {
        var _this = this;
        var layoutClassToAdd = "coveo-" + this.options.layout + "-layout-container";
        this.resultContainer.addClass(layoutClassToAdd);
        if (this.options.layout === 'table') {
            this.options.resultTemplate = new TableTemplate_1.TableTemplate(this.options.resultTemplate.templates || []);
        }
        // A TemplateList is the scenario where the result template are directly embedded inside the ResultList
        // This is the typical scenario when a page gets created by the interface editor, for example.
        // In that case, we try to stick closely that what is actually configured inside the page, and do no "special magic".
        // Stick to the "hardcoded" configuration present in the page.
        // We only add the correct layout options if it has not been set manually.
        if (this.options.resultTemplate instanceof TemplateList_1.TemplateList) {
            underscore_1.each(this.options.resultTemplate.templates, function (tmpl) {
                if (!tmpl.layout) {
                    tmpl.layout = _this.options.layout;
                }
            });
        }
        else if (this.options.resultTemplate instanceof DefaultResultTemplate_1.DefaultResultTemplate && this.options.layout == 'list') {
            ResponsiveDefaultResultTemplate_1.ResponsiveDefaultResultTemplate.init(this.root, this, {});
        }
    };
    /**
     * Empties the current result list content and appends the given array of HTMLElement.
     *
     * Can append to existing elements in the result list, or replace them.
     *
     * Triggers the `newResultsDisplayed` and `newResultDisplayed` events.
     * @param resultsElement
     * @param append
     */
    ResultList.prototype.renderResults = function (resultElements, append) {
        var _this = this;
        if (append === void 0) { append = false; }
        if (!append) {
            this.resultContainer.empty();
        }
        return this.renderer
            .renderResults(resultElements, append, this.triggerNewResultDisplayed.bind(this))
            .then(function () { return _this.triggerNewResultsDisplayed(); });
    };
    /**
     * Builds and returns an array of HTMLElement with the given result set.
     * @param results the result set to build an array of HTMLElement from.
     */
    ResultList.prototype.buildResults = function (results) {
        var layout = this.options.layout;
        return this.templateToHtml.buildResults(results, layout, this.currentlyDisplayedResults);
    };
    /**
     * Builds and returns an HTMLElement for the given result.
     * @param result the result to build an HTMLElement from.
     * @returns {HTMLElement}
     */
    ResultList.prototype.buildResult = function (result) {
        var layout = this.options.layout;
        return this.templateToHtml.buildResult(result, layout, this.currentlyDisplayedResults);
    };
    /**
     * Executes a query to fetch new results. After the query returns, renders the new results.
     *
     * Asserts that there are more results to display by verifying whether the last query has returned as many results as
     * requested.
     *
     * Asserts that the `ResultList` is not currently fetching results.
     * @param count The number of results to fetch and display.
     */
    ResultList.prototype.displayMoreResults = function (count) {
        Assert_1.Assert.isLargerOrEqualsThan(1, count);
        if (this.isCurrentlyFetchingMoreResults()) {
            this.logger.warn("Ignoring request to display more results since we're already doing so");
            return;
        }
        if (!this.hasPotentiallyMoreResultsToDisplay()) {
            this.logger.warn("Ignoring request to display more results since we know there aren't more to display");
            return;
        }
        if (this.options.enableInfiniteScrollWaitingAnimation) {
            this.showWaitingAnimationForInfiniteScrolling();
        }
        return this.fetchAndRenderMoreResults(count);
    };
    Object.defineProperty(ResultList.prototype, "templateToHtml", {
        get: function () {
            var templateToHtmlArgs = {
                resultTemplate: this.options.resultTemplate,
                searchInterface: this.searchInterface,
                queryStateModel: this.queryStateModel
            };
            return new TemplateToHtml_1.TemplateToHtml(templateToHtmlArgs);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the list of currently displayed result.
     * @returns {IQueryResult[]}
     */
    ResultList.prototype.getDisplayedResults = function () {
        return this.currentlyDisplayedResults;
    };
    /**
     * Gets the list of currently displayed result HTMLElement.
     * @returns {HTMLElement[]}
     */
    ResultList.prototype.getDisplayedResultsElements = function () {
        return this.resultContainer.getResultElements();
    };
    ResultList.prototype.enable = function () {
        var _this = this;
        _super.prototype.enable.call(this);
        this.disableLayoutChange = false;
        underscore_1.each(this.resultLayoutSelectors, function (resultLayoutSelector) {
            resultLayoutSelector.enableLayouts([_this.options.layout]);
        });
        Dom_1.$$(this.element).removeClass('coveo-hidden');
    };
    ResultList.prototype.disable = function () {
        var _this = this;
        _super.prototype.disable.call(this);
        var otherLayoutsStillActive = underscore_1.map(this.otherResultLists, function (otherResultList) { return otherResultList.options.layout; });
        if (!underscore_1.contains(otherLayoutsStillActive, this.options.layout) && !this.disableLayoutChange) {
            underscore_1.each(this.resultLayoutSelectors, function (resultLayoutSelector) {
                resultLayoutSelector.disableLayouts([_this.options.layout]);
            });
        }
        this.disableLayoutChange = false;
        Dom_1.$$(this.element).addClass('coveo-hidden');
    };
    ResultList.prototype.autoCreateComponentsInsideResult = function (element, result) {
        return this.templateToHtml.autoCreateComponentsInsideResult(element, result);
    };
    ResultList.prototype.triggerNewResultDisplayed = function (result, resultElement) {
        var args = {
            result: result,
            item: resultElement
        };
        Dom_1.$$(this.element).trigger(ResultListEvents_1.ResultListEvents.newResultDisplayed, args);
    };
    ResultList.prototype.triggerNewResultsDisplayed = function () {
        var args = {
            isInfiniteScrollEnabled: this.options.enableInfiniteScroll
        };
        Dom_1.$$(this.element).trigger(ResultListEvents_1.ResultListEvents.newResultsDisplayed, args);
    };
    ResultList.prototype.fetchAndRenderMoreResults = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fetchingMoreResults = this.queryController.fetchMore(count);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchingMoreResults];
                    case 2:
                        data = _a.sent();
                        Assert_1.Assert.exists(data);
                        this.usageAnalytics.logCustomEvent(AnalyticsActionListMeta_1.analyticsActionCauseList.pagerScrolling, {}, this.element);
                        this.reachedTheEndOfResults = count > data.results.length;
                        this.renderNewResults(data);
                        this.resetStateAfterFetchingMoreResults();
                        return [2 /*return*/, data];
                    case 3:
                        e_1 = _a.sent();
                        this.resetStateAfterFetchingMoreResults();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ResultList.prototype.renderNewResults = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var elements, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.buildResults(data)];
                    case 1:
                        elements = _b.sent();
                        this.renderResults(elements, true);
                        (_a = this.currentlyDisplayedResults).push.apply(_a, data.results);
                        this.triggerNewResultsDisplayed();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResultList.prototype.resetStateAfterFetchingMoreResults = function () {
        var _this = this;
        this.hideWaitingAnimationForInfiniteScrolling();
        this.fetchingMoreResults = undefined;
        Defer_1.Defer.defer(function () {
            _this.successiveScrollCount++;
            if (_this.successiveScrollCount <= ResultList.MAX_AMOUNT_OF_SUCESSIVE_REQUESTS) {
                _this.handleScrollOfResultList();
            }
            else {
                _this.logger.info("Result list has triggered 5 consecutive queries to try and fill up the scrolling container, but it is still unable to do so.\n          Try explicitly setting the 'data-infinite-scroll-container-selector' option on the result list. See: https://coveo.github.io/search-ui/components/resultlist.html#options.infinitescrollcontainer");
            }
        });
    };
    ResultList.prototype.handleDuringQuery = function () {
        this.logger.trace('Emptying the result container');
        this.cancelFetchingMoreResultsIfNeeded();
        this.showWaitingAnimation();
        this.showOrHideElementsDependingOnState(false, false);
    };
    ResultList.prototype.handleQueryError = function () {
        this.hideWaitingAnimation();
        this.resultContainer.empty();
        this.currentlyDisplayedResults = [];
        this.reachedTheEndOfResults = true;
    };
    ResultList.prototype.handleQuerySuccess = function (data) {
        var _this = this;
        Assert_1.Assert.exists(data);
        Assert_1.Assert.exists(data.results);
        var results = data.results;
        this.logger.trace('Received query results from new query', results);
        this.hideWaitingAnimation();
        ResultList.resultCurrentlyBeingRendered = undefined;
        this.reachedTheEndOfResults = data.query.numberOfResults > data.results.results.length;
        this.currentlyDisplayedResults = [];
        this.buildResults(data.results).then(function (elements) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.renderResults(elements)];
                    case 1:
                        _a.sent();
                        this.showOrHideElementsDependingOnState(true, this.currentlyDisplayedResults.length != 0);
                        if (DeviceUtils_1.DeviceUtils.isMobileDevice() && this.options.mobileScrollContainer != undefined) {
                            this.options.mobileScrollContainer.scrollTop = 0;
                        }
                        if (this.options.enableInfiniteScroll && results.results.length == data.queryBuilder.numberOfResults) {
                            // This will check right away if we need to add more results to make the scroll container full & scrolling.
                            this.scrollToTopIfEnabled();
                            this.handleScrollOfResultList();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ResultList.prototype.handleScrollOfResultList = function () {
        if (this.isCurrentlyFetchingMoreResults() || !this.options.enableInfiniteScroll) {
            return;
        }
        if (this.isScrollingOfResultListAlmostAtTheBottom() && this.hasPotentiallyMoreResultsToDisplay()) {
            this.displayMoreResults(this.options.infiniteScrollPageSize);
        }
    };
    ResultList.prototype.handlePageChanged = function () {
        var _this = this;
        this.bind.onRootElement(QueryEvents_1.QueryEvents.deferredQuerySuccess, function () {
            setTimeout(function () {
                _this.scrollToTopIfEnabled();
            }, 0);
        });
    };
    ResultList.prototype.scrollToTopIfEnabled = function () {
        if (!this.options.enableScrollToTop) {
            return;
        }
        ResultListUtils_1.ResultListUtils.scrollToTop(this.root);
    };
    ResultList.prototype.handleNewQuery = function () {
        Dom_1.$$(this.element).removeClass('coveo-hidden');
        ResultList.resultCurrentlyBeingRendered = undefined;
    };
    Object.defineProperty(ResultList.prototype, "otherResultLists", {
        get: function () {
            var allResultLists = this.searchInterface.getComponents(ResultList.ID);
            return underscore_1.without(allResultLists, this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultList.prototype, "resultLayoutSelectors", {
        get: function () {
            return this.searchInterface.getComponents('ResultLayoutSelector');
        },
        enumerable: true,
        configurable: true
    });
    ResultList.prototype.handleBuildingQuery = function (args) {
        if (this.options.fieldsToInclude != null) {
            // remove the @
            args.queryBuilder.addFieldsToInclude(underscore_1.map(this.options.fieldsToInclude, function (field) { return field.substr(1); }));
        }
        if (this.options.autoSelectFieldsToInclude) {
            var otherFields = underscore_1.flatten(underscore_1.map(this.otherResultLists, function (otherResultList) {
                return otherResultList.getAutoSelectedFieldsToInclude();
            }));
            args.queryBuilder.addRequiredFields(underscore_1.unique(otherFields.concat(this.getAutoSelectedFieldsToInclude())));
            args.queryBuilder.includeRequiredFields = true;
        }
    };
    ResultList.prototype.handleChangeLayout = function (args) {
        var _this = this;
        if (args.layout === this.options.layout) {
            this.disableLayoutChange = false;
            this.enable();
            this.options.resultTemplate.layout = this.options.layout;
            if (args.results) {
                // Prevent flickering when switching to a new layout that is empty
                // add a temporary placeholder, the same that is used on initialization
                if (this.resultContainer.isEmpty()) {
                    new InitializationPlaceholder_1.InitializationPlaceholder(this.root).withVisibleRootElement().withPlaceholderForResultList();
                }
                Defer_1.Defer.defer(function () { return __awaiter(_this, void 0, void 0, function () {
                    var elements;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.buildResults(args.results)];
                            case 1:
                                elements = _a.sent();
                                this.renderResults(elements);
                                this.showOrHideElementsDependingOnState(true, this.currentlyDisplayedResults.length !== 0);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        else {
            this.disableLayoutChange = true;
            this.disable();
            this.resultContainer.empty();
        }
    };
    ResultList.prototype.isCurrentlyFetchingMoreResults = function () {
        return Utils_1.Utils.exists(this.fetchingMoreResults);
    };
    ResultList.prototype.getMinimalFieldsToInclude = function () {
        // these fields are needed for analytics click event
        return ['author', 'language', 'urihash', 'objecttype', 'collection', 'source', 'language', 'permanentid'];
    };
    ResultList.prototype.isScrollingOfResultListAlmostAtTheBottom = function () {
        // this is in a try catch because the unit test fail otherwise (Window does not exist for phantom js in the console)
        var isWindow;
        try {
            isWindow = window.instanceOf(this.options.infiniteScrollContainer, Window);
        }
        catch (e) {
            isWindow = false;
        }
        return isWindow ? this.isScrollAtBottomForWindowElement() : this.isScrollAtBottomForHtmlElement();
    };
    ResultList.prototype.isScrollAtBottomForWindowElement = function () {
        var win = new Dom_1.Win(window);
        var windowHeight = win.height();
        var scrollTop = win.scrollY();
        var bodyHeight = new Dom_1.Doc(document).height();
        return bodyHeight - (windowHeight + scrollTop) < windowHeight / 2;
    };
    ResultList.prototype.isScrollAtBottomForHtmlElement = function () {
        var el = this.options.infiniteScrollContainer;
        var elementHeight = el.clientHeight;
        var scrollHeight = el.scrollHeight;
        var bottomPosition = el.scrollTop + elementHeight;
        return scrollHeight - bottomPosition < elementHeight / 2;
    };
    ResultList.prototype.hasPotentiallyMoreResultsToDisplay = function () {
        return this.currentlyDisplayedResults.length > 0 && !this.reachedTheEndOfResults;
    };
    ResultList.prototype.cancelFetchingMoreResultsIfNeeded = function () {
        if (this.isCurrentlyFetchingMoreResults()) {
            this.logger.trace('Cancelling fetching more results');
            Promise.reject(this.fetchingMoreResults);
            this.fetchingMoreResults = undefined;
        }
    };
    ResultList.prototype.showOrHideElementsDependingOnState = function (hasQuery, hasResults) {
        var showIfQuery = Dom_1.$$(this.element).findAll('.coveo-show-if-query');
        var showIfNoQuery = Dom_1.$$(this.element).findAll('.coveo-show-if-no-query');
        var showIfResults = Dom_1.$$(this.element).findAll('.coveo-show-if-results');
        var showIfNoResults = Dom_1.$$(this.element).findAll('.coveo-show-if-no-results');
        underscore_1.each(showIfQuery, function (s) {
            Dom_1.$$(s).toggle(hasQuery);
        });
        underscore_1.each(showIfNoQuery, function (s) {
            Dom_1.$$(s).toggle(!hasQuery);
        });
        underscore_1.each(showIfResults, function (s) {
            Dom_1.$$(s).toggle(hasQuery && hasResults);
        });
        underscore_1.each(showIfNoResults, function (s) {
            Dom_1.$$(s).toggle(hasQuery && !hasResults);
        });
    };
    Object.defineProperty(ResultList.prototype, "waitAnimation", {
        get: function () {
            return this.options.waitAnimation.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    ResultList.prototype.showWaitingAnimation = function () {
        switch (this.waitAnimation) {
            case 'fade':
                Dom_1.$$(this.options.waitAnimationContainer).addClass('coveo-fade-out');
                break;
            case 'spinner':
                this.resultContainer.hideChildren();
                if (Dom_1.$$(this.options.waitAnimationContainer).find('.coveo-wait-animation') == undefined) {
                    this.options.waitAnimationContainer.appendChild(DomUtils_1.DomUtils.getBasicLoadingAnimation());
                }
                break;
        }
    };
    ResultList.prototype.hideWaitingAnimation = function () {
        switch (this.waitAnimation) {
            case 'fade':
                Dom_1.$$(this.options.waitAnimationContainer).removeClass('coveo-fade-out');
                break;
            case 'spinner':
                var spinner = Dom_1.$$(this.options.waitAnimationContainer).find('.coveo-loading-spinner');
                if (spinner) {
                    Dom_1.$$(spinner).detach();
                }
                break;
        }
    };
    ResultList.prototype.showWaitingAnimationForInfiniteScrolling = function () {
        var spinner = DomUtils_1.DomUtils.getLoadingSpinner();
        if (this.options.layout == 'card' && this.options.enableInfiniteScroll) {
            var previousSpinnerContainer = Dom_1.$$(this.options.waitAnimationContainer).findAll('.coveo-loading-spinner-container');
            underscore_1.each(previousSpinnerContainer, function (previousSpinner) { return Dom_1.$$(previousSpinner).remove(); });
            var spinnerContainer = Dom_1.$$('div', {
                className: 'coveo-loading-spinner-container'
            });
            spinnerContainer.append(spinner);
            this.options.waitAnimationContainer.appendChild(spinnerContainer.el);
        }
        else {
            this.options.waitAnimationContainer.appendChild(DomUtils_1.DomUtils.getLoadingSpinner());
        }
    };
    ResultList.prototype.hideWaitingAnimationForInfiniteScrolling = function () {
        var spinners = Dom_1.$$(this.options.waitAnimationContainer).findAll('.coveo-loading-spinner');
        var containers = Dom_1.$$(this.options.waitAnimationContainer).findAll('.coveo-loading-spinner-container');
        underscore_1.each(spinners, function (spinner) { return Dom_1.$$(spinner).remove(); });
        underscore_1.each(containers, function (container) { return Dom_1.$$(container).remove(); });
    };
    ResultList.prototype.initResultContainer = function () {
        if (!this.options.resultsContainer) {
            var elemType = this.options.layout === 'table' ? 'table' : 'div';
            this.options.resultsContainer = Dom_1.$$(elemType, { className: 'coveo-result-list-container' }).el;
            this.initResultContainerAddToDom();
        }
        return new ResultContainer_1.ResultContainer(this.options.resultsContainer, this.searchInterface);
    };
    ResultList.prototype.initResultContainerAddToDom = function () {
        this.element.appendChild(this.options.resultsContainer);
    };
    ResultList.prototype.initWaitAnimationContainer = function () {
        if (!this.options.waitAnimationContainer) {
            this.options.waitAnimationContainer = this.resultContainer.el;
        }
    };
    ResultList.prototype.setupRenderer = function () {
        var initParameters = {
            options: this.searchInterface.options.originalOptionsObject,
            bindings: this.bindings
        };
        var autoCreateComponentsFn = function (elem) { return Initialization_1.Initialization.automaticallyCreateComponentsInside(elem, initParameters); };
        switch (this.options.layout) {
            case 'card':
                this.renderer = new ResultListCardRenderer_1.ResultListCardRenderer(this.options, autoCreateComponentsFn);
                break;
            case 'table':
                this.renderer = new ResultListTableRenderer_1.ResultListTableRenderer(this.options, autoCreateComponentsFn);
                break;
            case 'list':
            default:
                this.renderer = new ResultListRenderer_1.ResultListRenderer(this.options, autoCreateComponentsFn);
                break;
        }
    };
    ResultList.prototype.makeElementFocusable = function () {
        Dom_1.$$(this.element).setAttribute('tabindex', '-1');
    };
    ResultList.prototype.ensureHasId = function () {
        var currentId = this.element.id;
        if (currentId === '') {
            this.element.id = underscore_1.uniqueId('coveo-result-list');
        }
    };
    ResultList.ID = 'ResultList';
    ResultList.doExport = function () {
        GlobalExports_1.exportGlobally({
            ResultList: ResultList
        });
    };
    /**
     * The options for the ResultList
     * @componentOptions
     */
    ResultList.options = {
        /**
         * The element inside which to insert the rendered result templates.
         *
         * Performing a new query clears the content of this element.
         *
         * You can change the container by specifying its selector (e.g.,
         * `data-result-container-selector='#someCssSelector'`).
         *
         * If you specify no value for this option, a `div` element will be dynamically created and appended to the result
         * list. This element will then be used as a result container.
         */
        resultsContainer: ComponentOptions_1.ComponentOptions.buildChildHtmlElementOption({ alias: 'resultContainerSelector' }),
        resultTemplate: TemplateComponentOptions_1.TemplateComponentOptions.buildTemplateOption({ defaultFunction: ResultList.getDefaultTemplate }),
        /**
         * The type of animation to display while waiting for a query to return.
         *
         * The possible values are:
         * - `fade`: Fades out the current list of results while the query is executing.
         * - `spinner`: Shows a spinning animation while the query is executing.
         * - `none`: Use no animation during queries.
         *
         * See also the [`waitAnimationContainer`]{@link ResultList.options.waitAnimationContainer} option.
         *
         * @examples spinner
         */
        waitAnimation: ComponentOptions_1.ComponentOptions.buildStringOption({ defaultValue: 'none' }),
        /**
         * The element inside which to display the [`waitAnimation`]{@link ResultList.options.waitAnimation}.
         *
         * You can change this by specifying a CSS selector (e.g.,
         * `data-wait-animation-container-selector='#someCssSelector'`).
         *
         * Defaults to the value of the [`resultsContainer`]{@link ResultList.options.resultsContainer} option.
         */
        waitAnimationContainer: ComponentOptions_1.ComponentOptions.buildChildHtmlElementOption({
            postProcessing: function (value, options) { return value || options.resultsContainer; }
        }),
        /**
         * Whether to automatically retrieve an additional page of results and append it to the
         * results that the `ResultList` is currently displaying when the user scrolls down to the bottom of the
         * [`infiniteScrollContainer`]{@link ResultList.options.infiniteScrollContainer}.
         *
         * See also the [`infiniteScrollPageSize`]{@link ResultList.options.infiniteScrollPageSize} and
         * [`enableInfiniteScrollWaitingAnimation`]{@link ResultList.options.enableInfiniteScrollWaitingAnimation} options.
         *
         * It is important to specify the `infiniteScrollContainer` option manually if you want the scrolling element to be
         * something else than the default `window` element. Otherwise, you might find yourself in a strange state where the
         * framework rapidly triggers multiple successive query.
         */
        enableInfiniteScroll: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * The number of additional results to fetch when the user scrolls down to the bottom of the
         * [`infiniteScrollContainer`]{@link ResultList.options.infiniteScrollContainer}.
         *
         * @examples 5
         */
        infiniteScrollPageSize: ComponentOptions_1.ComponentOptions.buildNumberOption({
            defaultValue: 10,
            min: 1,
            depend: 'enableInfiniteScroll'
        }),
        /**
         * The element that triggers fetching additional results when the end user scrolls down to its bottom.
         *
         * You can change the container by specifying its selector (e.g.,
         * `data-infinite-scroll-container-selector='#someCssSelector'`).
         *
         * By default, the framework uses the first vertically scrollable parent element it finds, starting from the
         * `ResultList` element itself. A vertically scrollable element is an element whose CSS `overflow-y` attribute is
         * `scroll`.
         *
         * This implies that if the framework can find no scrollable parent, it uses the `window` itself as a scrollable
         * container.
         *
         * This heuristic is not perfect, for technical reasons. There are always some corner case CSS combination which the
         * framework will not be able to correctly detect as 'scrollable'.
         *
         * It is highly recommended that you manually set this option if you wish something else than the `window` to be the
         * scrollable element.
         */
        infiniteScrollContainer: ComponentOptions_1.ComponentOptions.buildChildHtmlElementOption({
            depend: 'enableInfiniteScroll',
            defaultFunction: function (element) { return ComponentOptions_1.ComponentOptions.findParentScrolling(element); }
        }),
        /**
         * Whether to display the [`waitingAnimation`]{@link ResultList.options.waitAnimation} while fetching additional
         * results.
         */
        enableInfiniteScrollWaitingAnimation: ComponentOptions_1.ComponentOptions.buildBooleanOption({
            depend: 'enableInfiniteScroll',
            defaultValue: true
        }),
        mobileScrollContainer: ComponentOptions_1.ComponentOptions.buildSelectorOption({
            defaultFunction: function () { return document.querySelector('.coveo-results-column'); }
        }),
        /**
         * Whether the `ResultList` should scan its result templates to discover which fields it must request to
         * be able to render all results.
         *
         * Setting this option to `true` ensures that the Coveo Search API does not return fields that are unnecessary for
         * the UI to function.
         *
         * **Notes:**
         *
         * - Many interfaces created with the JavaScript Search Interface Editor explicitly set this option to `true`.
         * - You cannot set this option to `true` in the Coveo for Sitecore integration.
         */
        autoSelectFieldsToInclude: ComponentOptions_1.ComponentOptions.buildBooleanOption({ defaultValue: false }),
        /**
         * A list of fields to include in the query results.
         *
         * If you set the [`autoSelectFieldsToInclude`]{@link ResultList.options.autoSelectFieldsToInclude} option to
         * `true`, the Coveo Search API returns the fields you specify for this option (if those fields are available) in
         * addition to the fields which the `ResultList` automatically requests.
         *
         * Otherwise, the Coveo Search API only returns the fields you specify for this option (if those fields are
         * available), unless you leave this option undefined, in which case the Coveo Search API returns all available
         * fields.
         */
        fieldsToInclude: ComponentOptions_1.ComponentOptions.buildFieldsOption({ includeInResults: true }),
        /**
         * Specifies the layout to use when displaying results in this `ResultList` (see
         * [Result Layouts](https://docs.coveo.com/en/360/)). Specifying a value for this option automatically
         * populates a [`ResultLayout`]{@link ResultLayout} component with a switcher for the layout.
         *
         * For example, if there are two `ResultList` components in the page, one with its `layout` set to `list` and the
         * other with the same option set to `card`, then the `ResultLayout` component will render two buttons respectively
         * entitled **List** and **Card**.
         *
         * See the [`ValidLayout`]{@link ValidLayout} type for the list of possible values.
         *
         * @examples card
         */
        layout: ComponentOptions_1.ComponentOptions.buildStringOption({
            defaultValue: 'list',
            required: true
        }),
        /**
         * Whether to scroll back to the top of the page when the end-user interacts with a facet.
         *
         * **Note:** Setting this option to `false` has no effect on dynamic facets. To disable this behavior on a `DynamicFacet` component, you must set its own [`enableScrollToTop`]{@link DynamicFacet.options.enableScrollToTop} option to `false`.
         *
         * @availablesince [July 2019 Release (v2.6459)](https://docs.coveo.com/en/2938/)
         */
        enableScrollToTop: ComponentOptions_1.ComponentOptions.buildBooleanOption({
            defaultValue: true,
            depend: 'enableInfiniteScroll'
        })
    };
    ResultList.resultCurrentlyBeingRendered = null;
    ResultList.MAX_AMOUNT_OF_SUCESSIVE_REQUESTS = 5;
    return ResultList;
}(Component_1.Component));
exports.ResultList = ResultList;
Initialization_1.Initialization.registerAutoCreateComponent(ResultList);


/***/ })

});
