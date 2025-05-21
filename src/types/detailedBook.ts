export interface DetailedBook {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    printedPageCount?: number;
    dimensions?: {
      height?: string;
    };
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    language?: string;
    maturityRating?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    previewLink?: string;
    canonicalVolumeLink?: string;
    infoLink?: string;
    readingModes?: {
      text: boolean;
      image: boolean;
    };
    printType?: string;
  };
  saleInfo?: {
    saleability?: string;
    isEbook?: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink?: string;
    offers?: {
      listPrice?: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice?: {
        amountInMicros: number;
        currencyCode: string;
      };
      giftable?: boolean;
    }[];
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    pdf?: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
  };
}