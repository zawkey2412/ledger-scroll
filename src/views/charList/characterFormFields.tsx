import FormField from "../../components/formField";
import { FieldArray } from "formik";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const CharacterFormFields: React.FC = () => {
  // State management for campaign input
  const [campaignInput, setCampaignInput] = useState<string>("");

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <label htmlFor="name" className="text-sm font-medium">
          Character Name
        </label>
        <FormField
          type="text"
          name="name"
          placeholder="Character Name"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="race" className="text-sm font-medium">
          Race
        </label>
        <FormField
          type="text"
          name="race"
          placeholder="Race"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>
      <div>
        <label htmlFor="class" className="text-sm font-medium">
          Class
        </label>
        <FormField
          type="text"
          name="class"
          placeholder="Class"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>
      <div>
        <label htmlFor="subclass" className="text-sm font-medium">
          Subclass
        </label>
        <FormField
          type="text"
          name="subclass"
          placeholder="Subclass"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="background" className="text-sm font-medium">
          Background
        </label>
        <FormField
          type="text"
          name="background"
          placeholder="Background"
          className="w-full p-1.5 border border-gray-300 rounded text-sm"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="backstory" className="text-sm font-medium">
          Backstory
        </label>
        <FormField
          as="textarea"
          name="backstory"
          placeholder="Backstory"
          className="w-full p-1.5 border border-gray-300 rounded text-sm h-20 resize-none"
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="campaigns" className="text-sm font-medium">
          Campaigns
        </label>
        <FieldArray name="campaigns">
          {({ push, remove, form }) => (
            <div>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={campaignInput}
                  onChange={(e) => setCampaignInput(e.target.value)}
                  placeholder="Add campaign"
                  className="w-full p-1.5 border border-gray-300 rounded text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        campaignInput.trim() &&
                        form.values.campaigns.length < 5
                      ) {
                        push(campaignInput.trim());
                        setCampaignInput("");
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (
                      campaignInput.trim() &&
                      form.values.campaigns.length < 5
                    ) {
                      push(campaignInput.trim());
                      setCampaignInput("");
                    }
                  }}
                  className="bg-primary hover:bg-accent text-white px-4 py-2 rounded"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.values.campaigns.map(
                  (campaign: string, index: number) => (
                    <div
                      key={index}
                      className="bg-white text-black px-3 py-1 rounded-full text-xs shadow-md flex items-center"
                    >
                      {campaign}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 font-bold text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  )
                )}
              </div>
              {form.values.campaigns.length >= 5 && (
                <p className="text-red-500 text-xs mt-2">
                  You can only add up to 5 campaigns.
                </p>
              )}
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default CharacterFormFields;
