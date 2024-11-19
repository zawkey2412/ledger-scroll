import { Field } from "formik";
import { NoteFormFieldsProps } from "../../types/note";
import FormField from "../../components/formField";

const NoteFormFields: React.FC<NoteFormFieldsProps> = ({
  showAsField,
  characters,
  filteredCampaignNames,
  handleCharacterNameChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <FormField
          name="title"
          placeholder="Enter title"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>

      <div>
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <FormField
          name="date"
          type="date"
          placeholder="Select date"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <FormField
          name="content"
          as="textarea"
          placeholder="Enter content"
          className="w-full p-1.5 border border-gray-300 rounded text-sm min-h-[100px]"
        />
      </div>

      {showAsField && (
        <div>
          <label htmlFor="characterName" className="text-sm font-medium">
            As
          </label>
          <Field
            as="select"
            id="characterName"
            name="characterName"
            className="w-full p-1.5 border border-gray-300 rounded text-sm"
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
        </div>
      )}

      <div>
        <label htmlFor="campaignName" className="text-sm font-medium">
          Campaign Name
        </label>
        <Field
          as="select"
          id="campaignName"
          name="campaignName"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
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
      </div>
    </>
  );
};

export default NoteFormFields;
