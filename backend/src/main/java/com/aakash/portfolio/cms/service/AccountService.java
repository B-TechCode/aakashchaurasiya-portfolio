package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.UpdateAccountRequest;
import com.aakash.portfolio.cms.dto.response.AccountResponse;

public interface AccountService {

    AccountResponse getAccount();

    void updateAccount(UpdateAccountRequest request);

}