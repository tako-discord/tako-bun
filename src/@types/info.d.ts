export type UrbanDictionaryResponse = {
	data: {
		contributor: string;
		date: string;
		example: string;
		meaning: string;
		word: string;
	}[];
	found?: boolean;
	message?: string;
	params?: {
		limit: string;
		matchCase: string;
		multiPage: string;
		page: string;
		scrapeType: string;
		strict: string;
	};
	statusCode: number;
	term: string;
	totalPages?: number;
};
