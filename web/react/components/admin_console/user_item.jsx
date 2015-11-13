// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

var Client = require('../../utils/client.jsx');
var Utils = require('../../utils/utils.jsx');

export default class UserItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleMakeMember = this.handleMakeMember.bind(this);
        this.handleMakeActive = this.handleMakeActive.bind(this);
        this.handleMakeNotActive = this.handleMakeNotActive.bind(this);
        this.handleMakeAdmin = this.handleMakeAdmin.bind(this);
        this.handleMakeSystemAdmin = this.handleMakeSystemAdmin.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);

        this.handleMakeNurse = this.handleMakeNurse.bind(this);
        this.handleMakeDoctor = this.handleMakeDoctor.bind(this);
        this.handleMakeRadiologist = this.handleMakeRadiologist.bind(this);
        this.handleMakeTechnician = this.handleMakeTechnician.bind(this);
        this.handleMakeAdministrator = this.handleMakeAdministrator.bind(this);

        this.state = {};
    }

    handleMakeMember(e) {
        e.preventDefault();
        const data = {
            user_id: this.props.user.id,
            new_roles: ''
        };

        Client.updateRoles(data,
            () => {
                this.props.refreshProfiles();
            },
            (err) => {
                this.setState({serverError: err.message});
            }
        );
    }

    handleMakeActive(e) {
        e.preventDefault();
        Client.updateActive(this.props.user.id, true,
            () => {
                this.props.refreshProfiles();
            },
            (err) => {
                this.setState({serverError: err.message});
            }
        );
    }

    handleMakeNotActive(e) {
        e.preventDefault();
        Client.updateActive(this.props.user.id, false,
            () => {
                this.props.refreshProfiles();
            },
            (err) => {
                this.setState({serverError: err.message});
            }
        );
    }

    handleMakeAdmin(e) {
        e.preventDefault();
        const data = {
            user_id: this.props.user.id,
            new_roles: 'admin'
        };

        Client.updateRoles(data,
            () => {
                this.props.refreshProfiles();
            },
            (err) => {
                this.setState({serverError: err.message});
            }
        );
    }

    handleMakeSystemAdmin(e) {
        e.preventDefault();
        const data = {
            user_id: this.props.user.id,
            new_roles: 'system_admin'
        };

        Client.updateRoles(data,
            () => {
                this.props.refreshProfiles();
            },
            (err) => {
                this.setState({serverError: err.message});
            }
        );
    }

    handleMakeAdministrator(e) {
                e.preventDefault();
                const data = {
                    user_id: this.props.user.id,
                    new_roles: 'administrator'
                };

                Client.updateRoles(data,
                    () => {
                        this.props.refreshProfiles();
                    },
                    (err) => {
                        this.setState({serverError: err.message});
                    }
                );
    }

    handleMakeTechnician(e) {
                e.preventDefault();
                const data = {
                    user_id: this.props.user.id,
                    new_roles: 'technician'
                };

                Client.updateRoles(data,
                    () => {
                        this.props.refreshProfiles();
                    },
                    (err) => {
                        this.setState({serverError: err.message});
                    }
                );
    }

    handleMakeRadiologist(e) {
                e.preventDefault();
                const data = {
                    user_id: this.props.user.id,
                    new_roles: 'radiologist'
                };

                Client.updateRoles(data,
                    () => {
                        this.props.refreshProfiles();
                    },
                    (err) => {
                        this.setState({serverError: err.message});
                    }
                );
    }

    handleMakeDoctor(e) {
                e.preventDefault();
                const data = {
                    user_id: this.props.user.id,
                    new_roles: 'doctor'
                };

                Client.updateRoles(data,
                    () => {
                        this.props.refreshProfiles();
                    },
                    (err) => {
                        this.setState({serverError: err.message});
                    }
                );
    }

    handleMakeNurse(e) {
            e.preventDefault();
            const data = {
                user_id: this.props.user.id,
                new_roles: 'nurse'
            };

            Client.updateRoles(data,
                () => {
                    this.props.refreshProfiles();
                },
                (err) => {
                    this.setState({serverError: err.message});
                }
            );
    }


    handleResetPassword(e) {
        e.preventDefault();
        this.props.doPasswordReset(this.props.user);
    }

    render() {
        let serverError = null;
        if (this.state.serverError) {
            serverError = (
                <div className='has-error'>
                    <label className='has-error control-label'>{this.state.serverError}</label>
                </div>
            );
        }

        const user = this.props.user;
        let currentRoles = 'Member';
        if (user.roles.length > 0) {
            if (Utils.isSystemAdmin(user.roles)) {
                currentRoles = 'System Admin';
            } else if (Utils.isAdmin(user.roles)) {
                currentRoles = 'Team Admin';
            } else {
                currentRoles = user.roles.charAt(0).toUpperCase() + user.roles.slice(1);
            }
        }

        const email = user.email;
        let showMakeMember = user.roles === 'admin' || user.roles === 'system_admin';
        let showMakeAdmin = user.roles === '' || user.roles === 'system_admin';
        let showMakeSystemAdmin = user.roles === '' || user.roles === 'admin';
        let showMakeActive = false;
        let showMakeNotActive = user.roles !== 'system_admin';

        if (user.delete_at > 0) {
            currentRoles = 'Inactive';
            showMakeMember = false;
            showMakeAdmin = false;
            showMakeSystemAdmin = false;
            showMakeActive = true;
            showMakeNotActive = false;
        }

        let makeSystemAdmin = null;
        if (showMakeSystemAdmin) {
            makeSystemAdmin = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeSystemAdmin}
                    >
                        {'Make System Admin'}
                    </a>
                </li>
            );
        }

        let makeAdmin = null;
        if (showMakeAdmin) {
            makeAdmin = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Team Admin'}
                    </a>
                </li>
            );
        }

        let makeMember = null;
        if (showMakeMember) {
            makeMember = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeMember}
                    >
                        {'Make Member'}
                    </a>
                </li>
            );
        }

        let makeNurse = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Nurse'}
                    </a>
                </li>
        );

        let makeDoctor= (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Doctor'}
                    </a>
                </li>
        );

        let makeTechnician = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Technician'}
                    </a>
                </li>
        );

        let makeRadiologist = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Radiologist'}
                    </a>
                </li>
        );

        let makeAdministrator = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeAdmin}
                    >
                        {'Make Administrator'}
                    </a>
                </li>
        );

        let makeActive = null;
        if (showMakeActive) {
            makeActive = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeActive}
                    >
                        {'Make Active'}
                    </a>
                </li>
            );
        }

        let makeNotActive = null;
        if (showMakeNotActive) {
            makeNotActive = (
                <li role='presentation'>
                    <a
                        role='menuitem'
                        href='#'
                        onClick={this.handleMakeNotActive}
                    >
                        {'Make Inactive'}
                    </a>
                </li>
            );
        }

        return (
            <tr>
                <td className='row member-div'>
                    <img
                        className='post-profile-img pull-left'
                        src={`/api/v1/users/${user.id}/image?time=${user.update_at}&${Utils.getSessionIndex()}`}
                        height='36'
                        width='36'
                    />
                    <span className='member-name'>{Utils.getDisplayName(user)}</span>
                    <span className='member-email'>{email}</span>
                    <div className='dropdown member-drop'>
                        <a
                            href='#'
                            className='dropdown-toggle theme'
                            type='button'
                            id='channel_header_dropdown'
                            data-toggle='dropdown'
                            aria-expanded='true'
                        >
                            <span>{currentRoles} </span>
                            <span className='caret'></span>
                        </a>
                        <ul
                            className='dropdown-menu member-menu'
                            role='menu'
                            aria-labelledby='channel_header_dropdown'
                        >
                            {makeNurse}
                            {makeDoctor}
                            {makeRadiologist}
                            {makeTechnician}
                            {makeAdministrator}
                            {makeAdmin}
                            {makeMember}
                            {makeActive}
                            {makeNotActive}
                            {makeSystemAdmin}
                            <li role='presentation'>
                                <a
                                    role='menuitem'
                                    href='#'
                                    onClick={this.handleResetPassword}
                                >
                                    {'Reset Password'}
                                </a>
                            </li>
                        </ul>
                    </div>
                    {serverError}
                </td>
            </tr>
        );
    }
}

UserItem.propTypes = {
    user: React.PropTypes.object.isRequired,
    refreshProfiles: React.PropTypes.func.isRequired,
    doPasswordReset: React.PropTypes.func.isRequired
};
