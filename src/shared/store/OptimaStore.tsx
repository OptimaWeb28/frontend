import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface IUseSearch {
	isOpen: boolean,
	setIsOpen: (value: boolean) => void;
	input: string;
	setInput: (value: string) => void;
	serviceLength: number;
	setServiceLength: (value: number) => void;
	doctorsLength: number;
	setDoctorsLength: (value: number) => void;
	newsLength: number;
	setNewsLength: (value: number) => void;
	articlesLength: number;
	setArticlesLength: (value: number) => void;
	openPopup: () => void;
	closePopup: () => void;

}

export const useSearch = create<IUseSearch>()(devtools((set) => ({
	isOpen: false,
	input: '',
	serviceLength: 0,
	doctorsLength: 0,
	newsLength: 0,
	articlesLength: 0,
	setIsOpen: (value) => {
		set({isOpen: value})
	},
	setInput: (value) => {
		set({input: value})
	},
	setServiceLength: (value) => {
		set({serviceLength: value})
	},
	setDoctorsLength: (value) => {
		set({doctorsLength: value})
	},
	setNewsLength: (value) => {
		set({newsLength: value})
	},
	setArticlesLength: (value) => {
		set({articlesLength: value})
	},
	openPopup: () => {
		set({isOpen: true});
		// document.body.style.overflow = 'hidden';
	},
	closePopup: () => {
		set({isOpen: false, input: ''});
		// document.body.style.overflow = 'auto';
	}
})))

type dropdownState = "opened" | "closed";

interface IUseNavMenuMobile {
	contactDropdown: dropdownState,
	callbackDropdown: dropdownState,
	isOverlay: boolean,
	setContactDropdown: (value: dropdownState) => void;
	setCallbackDropdown: (value: dropdownState) => void;
	setIsOverlay: (value: boolean) => void;
	closeContactDropdown: () => void;
	closeCallbackDropdown: () => void;
	closeAllDropdownsAndOverlay: (e?: any) => void;
	openCallbackDropdown: () => void;
	openContactDropdown: () => void;
}

export const useNavMenuMobile = create<IUseNavMenuMobile>()(devtools((set, get) => ({
	contactDropdown: "closed",
	callbackDropdown: 'closed',
	isOverlay: false,
	setContactDropdown: (value) => {
		set({contactDropdown: value})
	},
	setCallbackDropdown: (value) => {
		set({callbackDropdown: value})
	},
	setIsOverlay: (value) => {
		set({isOverlay: value})
	},
	closeContactDropdown: () => {
		set({contactDropdown: "closed", isOverlay: false});
		document.body.style.overflow = "auto";
	},
	closeCallbackDropdown: () => {
		set({callbackDropdown: "closed", isOverlay: false});
		document.body.style.overflow = "auto";
	},
	closeAllDropdownsAndOverlay: (e) => {
		if (e.target.classList.contains('nav-overlay')) {
			e.stopPropagation();
			e.preventDefault();
			set({contactDropdown: "closed"});
			set({callbackDropdown: "closed"});
			document.body.style.overflow = "auto";
			set({isOverlay: false});
			return;
		}
		if (get().contactDropdown === 'opened') {
			set({contactDropdown: "closed"});
		}
		if (get().callbackDropdown === "opened") {
			set({callbackDropdown: "closed"});
		}
		document.body.style.overflow = "auto";
		set({isOverlay: false});
	},
	openCallbackDropdown: () => {
		set({callbackDropdown: "opened", isOverlay: true});
		document.body.style.overflow = "hidden";
	},
	openContactDropdown: () => {
		set({contactDropdown: "opened", isOverlay: true});
		document.body.style.overflow = "hidden";
	}
})))

interface IUseChat {
	loading: boolean;
	setLoading: (value: boolean) => void;
	openChat: () => void;
}

export const useChat = create<IUseChat>()(devtools((set, get) => ({
	loading: false,
	setLoading: (value) => {
		set({loading: value});
	},
	openChat: () => {
		if (!document.body.classList.contains('TalkMe-initialized')) {
			set({loading: true})
			setTimeout(() => get().openChat(), 1000);
		} else {
			set({loading: false})
			MeTalk('openSupport');
			return false;
		}
	}
})))

interface IUseCallbackPopup {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	openPopup: () => void;
}

export const useCallbackPopup = create<IUseCallbackPopup>()(devtools((set, get) => ({
	isOpen: false,
	setIsOpen: (value) => {
		set({isOpen: value});
	},
	openPopup: () => {
		document.body.style.overflow = 'hidden';
		set({isOpen: true});
	}
})))

interface IUseRecordPopup {
	defaultPath: string;
	path: string;
	isOpen: boolean;
	openRecordPopup: (path?: string) => void;
	closeRecordPopup: (e?: any) => void;
}

export const useRecordPopup = create<IUseRecordPopup>()(devtools((set, get) => ({
	defaultPath: 'https://online-optimaldc.medods.ru',
	path: 'https://online-optimaldc.medods.ru',
	isOpen: false,
	openRecordPopup: (path) => {
		if (path) {
			set({path})
			set({isOpen: true});
			document.body.style.overflow = 'hidden';
		} else {
			set({path: get().defaultPath})
			set({isOpen: true});
			document.body.style.overflow = 'hidden';
		}
	},
	closeRecordPopup: (e) => {
		if (!e) {
			set({isOpen: false});
			document.body.style.overflow = 'auto';
		} else {
			if (e.target.classList.contains('recordOverlay')) {
				set({isOpen: false});
				document.body.style.overflow = 'auto';
			}
		}
	}
})))