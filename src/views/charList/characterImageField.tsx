import { FaTrashAlt } from "react-icons/fa";
import { useCallback, useMemo, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { CharacterImageFieldProps } from "../../types/character";

const DEFAULT_AVATAR = "/default-avatar.png";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

const CharacterImageField: React.FC<CharacterImageFieldProps> = ({
  imagePreview,
  showImageInput,
  handleImageLinkChange,
  handleRemoveImage,
  setFieldValue,
}) => {
  // State management for image URL and input value
  const [validImageUrl, setValidImageUrl] = useState<string>(DEFAULT_AVATAR);
  const [inputValue, setInputValue] = useState<string>("");

  // Handle image removal
  const handleImageRemove = useCallback(() => {
    setValidImageUrl(DEFAULT_AVATAR);
    setInputValue("");
    handleRemoveImage(setFieldValue);
  }, [handleRemoveImage, setFieldValue]);

  // Validate image URL
  const validateImage = useCallback(
    (url: string) => {
      if (!url) {
        setValidImageUrl(DEFAULT_AVATAR);
        return;
      }
      const img = new Image();
      img.onload = () => setValidImageUrl(url);
      img.onerror = () => {
        setValidImageUrl(PLACEHOLDER_IMAGE);
        setInputValue(PLACEHOLDER_IMAGE);
        setFieldValue("image", PLACEHOLDER_IMAGE);
      };
      img.src = url;
    },
    [setFieldValue]
  );

  // Validate image when imagePreview changes
  useEffect(() => {
    validateImage(imagePreview);
  }, [imagePreview, validateImage]);

  // Debounce image link change handler
  const debouncedFn = useMemo(
    () =>
      debounce(
        (event, setValue) => handleImageLinkChange(event, setValue),
        3000
      ),
    [handleImageLinkChange]
  );

  const debouncedHandleImageLinkChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      setValue: typeof setFieldValue
    ) => {
      debouncedFn(event, setValue);
    },
    [debouncedFn]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return (
    <div className="col-span-2">
      <label className="text-sm font-medium">Character Image Link</label>
      <div className="mt-1 flex items-center space-x-4">
        <div className="w-24 h-24 border rounded overflow-hidden flex items-center justify-center bg-gray-50">
          <img
            src={validImageUrl}
            className="w-full h-full object-cover min-w-[6rem] min-h-[6rem]"
          />
        </div>
        <div className="flex flex-col space-y-2">
          {showImageInput ? (
            <input
              type="text"
              name="image"
              value={inputValue}
              placeholder="Paste the image URL here..."
              className="w-full p-1.5 border focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300 rounded text-sm"
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                setFieldValue("image", value);
                debouncedHandleImageLinkChange(e, setFieldValue);
              }}
            />
          ) : (
            <button
              type="button"
              onClick={handleImageRemove}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterImageField;
