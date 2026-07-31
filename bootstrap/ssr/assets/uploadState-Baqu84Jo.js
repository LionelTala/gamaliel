//#region resources/js/lib/uploadState.ts
var uploadState = {
	active: false,
	setActive(status) {
		this.active = status;
		window.dispatchEvent(new CustomEvent("upload-state-change", { detail: status }));
	}
};
//#endregion
export { uploadState as t };

//# sourceMappingURL=uploadState-Baqu84Jo.js.map