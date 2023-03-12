export interface UnsplashImageType {
  url: string;

  // author details
  firstName: string;
  lastName: string;
  name: string;
  authorUrl: string;
}

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

console.log(unsplashAccessKey);

// get image url from unsplash given a search term
export const getUnsplashImageUrl = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${unsplashAccessKey}`
  );

  const data = await response.json();
  console.log(data);
  return data.results[0].urls.regular;
};

// get all image urls from unsplash given a search term
export const getUnsplashImageUrls = async (searchTerm: string) => {
  const orientation = "landscape";
  const content_filter = "high";
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${unsplashAccessKey}&orientation=${orientation}&content_filter=${content_filter}`
  );

  const data = await response.json();
  console.log(data);
  return data.results.map((result: any) => result.urls.regular);
};

// get images from unsplash given a search term
export const getUnsplashImages = async (searchTerm: string) => {
  const orientation = "landscape";
  const content_filter = "high";
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${unsplashAccessKey}&orientation=${orientation}&content_filter=${content_filter}`
  );

  const data = await response.json();

  return data.results.map((result: any) => {
    return {
      url: result.urls.regular,
      firstName: result.user.first_name,
      lastName: result.user.last_name,
      name: result.user.name,
      authorUrl: result.user.links.html,
    } as UnsplashImageType;
  });
};
