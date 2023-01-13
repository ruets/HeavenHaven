import "./AccountSettingsForm.scss"
import Input from "../../fields/Input/Input";
import React, { useState, useCallback } from "react";

export function AccountSettingsForm() {
    return (
    <form className="account">
        <h1> Password </h1>
            <div className="field">
                <p> Old password </p>
                <Input type="text"
                        name="oldPassword"
                        label="">
                </Input>
            </div>
            <div className="field">
                <p> New password </p>
                <Input type="text"
                        name="newPassword"
                        label="">
            
                </Input>
            </div>
            <div className="field">
                <p> Confirm new password </p>
                <Input type="text"
                        name="confirmation"
                        label="">
            
                </Input>
            </div>
            <button type="submit" className="cta"> Save changes </button>
        </form>
);
}