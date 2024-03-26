import React, { useState } from 'react';
import { format } from 'date-fns';
import './ModuleTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Module } from '../utils/modules';

interface ModuleTableProps {
    modules: Module[];
}

const ModuleTable: React.FC<ModuleTableProps> = ({ modules }) => {
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [selectedModuleName, setSelectedModuleName] = useState<string>('All');
    const [iconColor, setIconColor] = useState<'#181818' | '#2B72EE'>('#181818');

    const handleSortByName = () => {
        setSortBy('name');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortByCreatedDate = () => {
        setSortBy('createdDate');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleIconClick = () => {
        setIconColor(iconColor === '#181818' ? '#2B72EE' : '#181818');
    };

    const sortedModules = [...modules].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortBy === 'createdDate') {
            return sortOrder === 'asc'
                ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
                : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
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

    const getSortIcon = (column: string) => {
        return <FontAwesomeIcon
            icon={faSortDown}
            color={sortBy === column && sortOrder === 'desc' ? iconColor : '#181818'}
            onClick={handleIconClick}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
        />;
    };

    return (
        <section>
            <div className="filters">
                <h3 style={{ marginRight: '10px' }}>Список модулей</h3>
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
            <div className="module-table" style={{ margin: '10px' }}>
                <table>
                    <thead>
                        <tr>
                            <th className="checkbox-cell"></th>
                            <th onClick={handleSortByName} style={{width: '350px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Наименование модуля
                                    {getSortIcon('name')}
                                </div>
                            </th>
                            <th onClick={handleSortByCreatedDate}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Дата создания
                                    {getSortIcon('createdDate')}
                                </div>
                            </th>
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
        </section>
    );
};

export default ModuleTable;
