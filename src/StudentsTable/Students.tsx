import React, { useState } from 'react';
import './StudentsTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Student } from '../utils/students';

interface StudentTableProps {
    students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedGroupName, setSelectedGroupName] = useState<string>('All');
    const [iconColor, setIconColor] = useState<'#181818' | '#2B72EE'>('#181818');

    const handleSortByName = () => {
        setSortBy('fullName');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortByStatus = () => {
        setSortBy('status');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleIconClick = () => {
        setIconColor(iconColor === '#181818' ? '#2B72EE' : '#181818');
    };

    const sortedStudents = [...students].sort((a, b) => {
        if (sortBy === 'fullName') {
            return sortOrder === 'asc'
                ? a.fullName.localeCompare(b.fullName)
                : b.fullName.localeCompare(a.fullName);
        } else if (sortBy === 'status') {
            return sortOrder === 'asc'
                ? a.status.localeCompare(b.status)
                : b.status.localeCompare(a.status);
        }
        return 0;
    });

    let filteredStudents = sortedStudents;

    if (selectedGroupName !== 'All') {
        filteredStudents = sortedStudents.filter(student => student.group === selectedGroupName);
    }

    const groupNames = students.map(student => student.group);
    const uniqueGroupNames = Array.from(new Set(groupNames));

    const getSortIcon = (column: string) => {
        return <FontAwesomeIcon
            icon={faSortDown}
            color={sortBy === column && sortOrder === 'desc' ? iconColor : '#181818'}
            onClick={handleIconClick}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
        />;
    };

    const getStatusColor = (status: string) => {
        if (status === 'Активен') {
            return '#50B57F';
        }
        return '#EDEDED';
    };

    return (
        <section>
            <div className="filters">
                <h3 style={{ marginRight: '10px' }}>Список учеников</h3>
                <select value={selectedGroupName} onChange={(e) => setSelectedGroupName(e.target.value)} style={{ marginRight: '10px' }}>
                    <option value="All">Группа</option>
                    {uniqueGroupNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
            <div className="student-table" style={{ margin: '10px', width: '1220px', height: '816px' }}>
                <table>
                    <thead>
                        <tr>
                            <th className="checkbox-cell"></th>
                            <th onClick={handleSortByName} style={{width: '350px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Фамилия Имя Отчество
                                    {getSortIcon('fullName')}
                                </div>
                            </th>
                            <th style={{width: '160px'}}>
                                Группа
                            </th>
                            <th onClick={handleSortByStatus} style={{width: '652px'}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Статус
                                    {getSortIcon('status')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id}>
                                <td className="checkbox-cell">
                                    <input type="checkbox" />
                                </td>
                                <td>{student.fullName}</td>
                                <td>{student.group}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(student.status),
                                            marginRight: '5px'
                                        }}></div>
                                        {student.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default StudentTable;
