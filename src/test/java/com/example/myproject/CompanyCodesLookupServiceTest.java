package com.example.myproject;

import com.enonic.xp.testing.ScriptRunnerSupport;

public class CompanyCodesLookupServiceTest extends ScriptRunnerSupport
{
    @Override
    public String getScriptTestFile()
    {
        return "/services/company-codes-lookup-service/company-codes-lookup-service-test.es6";
    }
}
