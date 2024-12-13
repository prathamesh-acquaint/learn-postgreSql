import { Request, Response, NextFunction } from 'express';
import {
  createInterest,
  deleteInterest,
  getAllInterest,
  getInterestByName,
  updateInterest,
} from '../../services/admin/interest.service';
import { getIndustryById } from '../../services/admin/industry.service';

export const createInterestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, industryId } = req.body;

    // Check if industry exists.
    const industry = await getIndustryById(industryId);
    if (!industry) {
      res.status(404).json({ message: 'Industry not found' });
    }

    // Check for any duplicate values.
    const isDuplicate = await getInterestByName(name.toLowerCase());
    if (isDuplicate) {
      next({ status: 403, message: 'Duplicate Interest name not allowed.' });
    }

    const newInterest = await createInterest({
      name: name.toLowerCase(),
      industryId,
    });
    res
      .status(201)
      .json({ message: 'Interest created successfuly', industry: newInterest });
  } catch (error) {
    next(error);
  }
};

export const updateInterestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, industryId } = req.body;
    const interestId = req.params.id;

    // Check if industry exists.
    const industry = await getIndustryById(industryId);
    if (!industry) {
      res.status(404).json({ message: 'Industry not found' });
    }

    // Check for any duplicate values.
    const isDuplicate = await getInterestByName(name.toLowerCase());
    if (isDuplicate) {
      next({ status: 403, message: 'Duplicate Interest name not allowed.' });
    }

    const updatedInterest = await updateInterest(Number(interestId), {
      name: name.toLowerCase(),
      industryId,
    });
    res.status(201).json({
      message: 'Interest updated successfuly',
      industry: updatedInterest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInterestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const interestId = req.params.id;

    const deletedInterest = await deleteInterest(Number(interestId));
    res.status(201).json({
      message: 'Interest deleted successfuly',
      industry: deletedInterest,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInterestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, pageSize, search } = req.query;
  try {
    const allInterests = await getAllInterest({
      page: Number(page ?? 1),
      pageSize: Number(pageSize ?? 10),
      search: search as string,
    });
    res.status(200).json({
      message: 'Successfully got all interests',
      data: allInterests?.data,
      pagination: allInterests?.pagination,
    });
  } catch (error) {
    next(error);
  }
};
