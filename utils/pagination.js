const pageNumber = req.query.pageNumber || 1;
const itemsPerPage = 10;

const startIndex = (pageNumber - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const items = await Item.find().skip(startIndex).limit(itemsPerPage);
