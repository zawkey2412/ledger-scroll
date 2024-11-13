import { Field, ErrorMessage } from "formik";
import { NoteFormFieldsProps } from "../../types/note";

const NoteFormFields: React.FC<NoteFormFieldsProps> = ({
  showAsField,
  characters,
  filteredCampaignNames,
  handleCharacterNameChange,
}) => {
  return (
    <>
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Field
          id="title"
          name="title"
          type="text"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
      {/* Date Field */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <Field
          id="date"
          name="date"
          type="date"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="date"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
      {/* Content Field */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <Field
          id="content"
          name="content"
          as="textarea"
          rows="4"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="content"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
      {/* Character Name Field */}
      {showAsField && (
        <div>
          <label
            htmlFor="characterName"
            className="block text-sm font-medium text-gray-700"
          >
            As
          </label>
          <Field
            as="select"
            id="characterName"
            name="characterName"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={handleCharacterNameChange}
          >
            <option value="" disabled>
              Select a character
            </option>
            {characters.map((character) => (
              <option key={character.id} value={character.name}>
                {character.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="characterName"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      )}
      {/* Campaign Name Field */}
      <div>
        <label
          htmlFor="campaignName"
          className="block text-sm font-medium text-gray-700"
        >
          Campaign Name
        </label>
        <Field
          as="select"
          id="campaignName"
          name="campaignName"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select a campaign
          </option>
          {filteredCampaignNames.map((campaign) => (
            <option key={campaign} value={campaign}>
              {campaign}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="campaignName"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    </>
  );
};

export default NoteFormFields;
