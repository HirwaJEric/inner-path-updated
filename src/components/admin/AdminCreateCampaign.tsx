
import React from "react";
import { Button } from "@/components/ui/button";

const AdminCreateCampaign = ({ onBack }: { onBack: () => void }) => {
  return (
    <div>
      <button className="mb-6 text-primary hover:underline" onClick={onBack}>
        ← Back to Campaigns
      </button>
      <h2 className="text-2xl font-bold mb-4">Create Email Campaign</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <label className="block mb-2 font-medium">Campaign Subject</label>
        <input className="w-full border rounded px-3 py-2 mb-4" placeholder="Subject" />
        <label className="block mb-2 font-medium">Message</label>
        <textarea className="w-full border rounded px-3 py-2 mb-4" rows={5} placeholder="Campaign content..." />
        <Button>Create Campaign</Button>
      </div>
    </div>
  );
};

export default AdminCreateCampaign;
