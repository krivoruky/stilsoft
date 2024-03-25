import React, { useState } from 'react';
import { format } from 'date-fns';
import './ModuleTable.css';
import { Module } from '../App';

interface ModuleTableProps {
    modules: Module[];
}

const ModuleTable: React.FC<ModuleTableProps> = ({ modules }) => {
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [selectedModuleName, setSelectedModuleName] = useState<string>('All');

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedModules = [...modules].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'createdDate') {
            return sortOrder === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        }
        return 0;
    });

    let filteredModules = sortedModules;

    if (selectedModuleName !== 'All') {
        filteredModules = sortedModules.filter(module => module.name === selectedModuleName);
    }

    filteredModules = filteredModules.filter(module => module.name.toLowerCase().includes(inputSearchValue.toLowerCase()));

    const moduleNames = modules.map(module => module.name);
    const uniqueModuleNames = Array.from(new Set(moduleNames));

    return (
        <div className="module-table">
            <div className="filters">
                <h3>Список модулей</h3>
                <select value={selectedModuleName} onChange={(e) => setSelectedModuleName(e.target.value)}>
                    <option value="All">Дисциплина</option>
                    {uniqueModuleNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Поиск по названию"
                    value={inputSearchValue}
                    onChange={(e) => setInputSearchValue(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="checkbox-cell">Чекбокс</th>
                        <th onClick={() => handleSort('name')}>Наименование модуля</th>
                        <th onClick={() => handleSort('createdDate')}>Дата создания</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredModules.map((module) => (
                        <tr key={module.id}>
                            <td className="checkbox-cell">
                                <input type="checkbox" />
                            </td>
                            <td>{module.name}</td>
                            <td>{format(new Date(module.createdDate), 'dd.MM.yyyy')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModuleTable;
