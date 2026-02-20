import { ICartItem } from '../Types/Getcart.Types';

/**
 * Normalizes a cart item to ensure productId is always a string
 * Handles both formats:
 * - productId as string: "6994b895b2fd98aa3a009402"
 * - productId as object: { _id: "6994b895b2fd98aa3a009402", ... }
 */
export const normalizeCartItem = (item: any): ICartItem => {
  if (!item) {
    throw new Error('Cart item cannot be null or undefined');
  }

  // Extract productId as string
  let productId: string;
  if (typeof item.productId === 'string') {
    productId = item.productId;
  } else if (item.productId?._id) {
    productId = item.productId._id;
  } else if (item.productId && typeof item.productId === 'object') {
    // Try to extract _id from nested object
    productId = item.productId._id || item.productId.id || '';
  } else {
    // Fallback: try to convert to string
    productId = String(item.productId || '');
  }

  // Extract image (handle both 'image' and 'images[0]')
  const image = item.image || item.images?.[0] || '';

  // Ensure images is an array
  let images: string[] = [];
  if (Array.isArray(item.images)) {
    images = item.images;
  } else if (item.image) {
    images = [item.image];
  } else if (item.productId?.images && Array.isArray(item.productId.images)) {
    images = item.productId.images;
  }

  // Calculate lineTotal if not provided
  const quantity = item.quantity || 1;
  const price = item.price || 0;
  const lineTotal = item.lineTotal ?? price * quantity;

  // Return normalized cart item
  return {
    _id: item._id || '',
    productId,
    name: item.name || '',
    image,
    images,
    unit: item.unit || '',
    price,
    originalPrice: item.originalPrice || price,
    quantity,
    lineTotal,
    discount: item.discount || 0,
  };
};

/**
 * Normalizes an array of cart items
 */
export const normalizeCartItems = (items: any[]): ICartItem[] => {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeCartItem);
};
