export const ImageWebView = (image: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <style> * { margin: 0px; padding:0; } </style>
   </head>
   <body>
   <img loading="lazy" width="100%" height="100%" style="object-fit: contain" src="${image}" /> 
   </body>
   </html> `;
};
