// import { useState, useEffect } from "react";
// import { PageHeader } from "@/components/ui/PageHeader";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/Input";
// import { Label } from "@/components/ui/Label";
// import Modal from "@/components/ui/Modal";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { usePermission } from "@/hooks/auth/usePermission";
// import { getProjects, createProject, updateProject, deleteProject } from "@/services/project.service";
// import { getDepartments } from "@/services/department.service";
// import type { IProject, IDepartment } from "@repo/types";
// import { Trash2, Edit2 } from "lucide-react";

// export default function Projects() {
//   const { hasPermission } = usePermission();
//   const [projects, setProjects] = useState<IProject[]>([]);
//   const [departments, setDepartments] = useState<IDepartment[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editing, setEditing] = useState<IProject | null>(null);
//   const [formData, setFormData] = useState<Partial<IProject>>({ name: "", description: "", departmentId: "", startDate: "" });

//   const fetchProjects = async () => {
//     try {
//       const data = await getProjects();
//       setProjects(data);
//     } catch (error) {
//       console.error("Error fetching projects", error);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const deps = await getDepartments();
//       setDepartments(deps);
//     } catch (error) {
//       console.error("Error fetching departments", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchDepartments();
//   }, []);

//   const openModal = (p?: IProject) => {
//     if (p) {
//       setEditing(p);
//       setFormData({
//         name: p.name,
//         description: p.description,
//         departmentId: p.departmentId,
//         startDate: p.startDate ? String(p.startDate) : undefined,
//         endDate: p.endDate ? String(p.endDate) : undefined,
//         isActive: p.isActive,
//         status: p.status,
//       });
//     } else {
//       setEditing(null);
//       setFormData({ name: "", description: "", departmentId: "", startDate: "" });
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditing(null);
//     setFormData({});
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editing && editing._id) {
//         await updateProject(editing._id, formData);
//       } else {
//         await createProject(formData);
//       }
//       await fetchProjects();
//       closeModal();
//     } catch (error) {
//       console.error("Error saving project", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this project?")) return;
//     try {
//       await deleteProject(id);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error deleting project", error);
//     }
//   };

//   const canManage = hasPermission('manage_projects');

//   return (
//     <div className="space-y-6">
//       <PageHeader title="Projects" description="Manage projects." actionLabel={canManage ? "Add Project" : undefined} onAction={canManage ? () => openModal() : undefined} />

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               {canManage && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {projects.map((p) => (
//               <tr key={p._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{departments.find(d => d._id === p.departmentId)?.departmentName || '-'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.status}</td>
//                 {canManage && (
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button onClick={() => openModal(p)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit2 className="h-4 w-4" /></button>
//                     <button onClick={() => p._id && handleDelete(p._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//             {projects.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No projects found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={closeModal} title={editing ? "Edit Project" : "Add Project"}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//           </div>

//           <div>
//             <Label>Department</Label>
//             <Select value={formData.departmentId} onValueChange={(v) => setFormData({ ...formData, departmentId: v })}>
//               <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
//               <SelectContent>
//                 {departments.map((d) => (<SelectItem key={d._id} value={d._id || ''}>{d.departmentName}</SelectItem>))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="startDate">Start Date</Label>
//             <Input id="startDate" type="date" value={formData.startDate ? String(formData.startDate).slice(0,10) : ''} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
//           </div>

//           <div>
//             <Label htmlFor="endDate">End Date</Label>
//             <Input id="endDate" type="date" value={formData.endDate ? String(formData.endDate).slice(0,10) : ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
//           </div>

//           <div className="flex justify-end space-x-2 mt-4">
//             <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
//             <Button type="submit">{editing ? "Update" : "Create"}</Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }
