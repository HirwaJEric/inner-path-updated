
import React from "react";
import { Button } from "@/components/ui/button";

interface AdminEmailCampaignsProps {
  onCreate?: () => void;
}

const campaigns = [
  { id: 1, subject: "Spring Update", sent: "2024-04-01", recipients: 1200 },
  { id: 2, subject: "New Courses!", sent: "2024-03-15", recipients: 800 },
  { id: 3, subject: "Meditation Week", sent: "2024-03-01", recipients: 1050 },
];

const AdminEmailCampaigns: React.FC<AdminEmailCampaignsProps> = ({
  onCreate,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Email Campaigns</h2>
        <Button onClick={onCreate}>Create Campaign</Button>
      </div>
      <div className="bg-white rounded shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Sent</th>
              <th className="py-2 px-4 text-left">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="py-2 px-4">{c.subject}</td>
                <td className="py-2 px-4">{c.sent}</td>
                <td className="py-2 px-4">{c.recipients}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-muted-foreground text-xs p-4">Demo data only.</p>
      </div>
    </div>
  );
};

export default AdminEmailCampaigns;
