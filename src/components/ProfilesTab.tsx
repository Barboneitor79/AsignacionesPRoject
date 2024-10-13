import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { useProfiles, Profile } from '../hooks/useProfiles';

const roles = ['Microfono', 'Audio', 'Video', 'Plataforma', 'Acomodador'];

const ProfilesTab: React.FC = () => {
  const { profiles, updateProfiles } = useProfiles();
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newRoles, setNewRoles] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddProfile = () => {
    if (newName && newAge && newRoles.length > 0) {
      const newProfile: Profile = {
        id: Date.now(),
        name: newName,
        age: parseInt(newAge),
        roles: newRoles
      };
      const updatedProfiles = [...profiles, newProfile];
      updateProfiles(updatedProfiles);
      resetForm();
    }
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingId(profile.id);
    setNewName(profile.name);
    setNewAge(profile.age.toString());
    setNewRoles(profile.roles);
  };

  const handleUpdateProfile = () => {
    if (editingId && newName && newAge && newRoles.length > 0) {
      const updatedProfiles = profiles.map(profile =>
        profile.id === editingId
          ? { ...profile, name: newName, age: parseInt(newAge), roles: newRoles }
          : profile
      );
      updateProfiles(updatedProfiles);
      resetForm();
    }
  };

  const handleDeleteProfile = (id: number) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    updateProfiles(updatedProfiles);
  };

  const resetForm = () => {
    setNewName('');
    setNewAge('');
    setNewRoles([]);
    setEditingId(null);
  };

  const handleRoleToggle = (role: string) => {
    setNewRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Perfiles</h2>
      <div className="mb-4 space-y-2">
        <Input
          type="text"
          placeholder="Nombre del perfil"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Edad"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          className="w-full"
        />
        <div className="space-y-2">
          {roles.map((role) => (
            <div key={role} className="flex items-center space-x-2">
              <Checkbox
                id={role}
                checked={newRoles.includes(role)}
                onCheckedChange={() => handleRoleToggle(role)}
              />
              <label htmlFor={role} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {role}
              </label>
            </div>
          ))}
        </div>
        {editingId ? (
          <Button onClick={handleUpdateProfile} className="w-full">
            Actualizar Perfil
          </Button>
        ) : (
          <Button onClick={handleAddProfile} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Agregar Perfil
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{profile.name} ({profile.age} años)</h3>
              <p className="text-sm text-gray-600">Roles: {profile.roles.join(', ')}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEditProfile(profile)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteProfile(profile.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesTab;