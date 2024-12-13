import { Request, Response, NextFunction } from 'express';
import {
  createIndustry,
  deleteIndustry,
  getAllIndustries,
  getIndustryByName,
  updateIndustry,
} from '../../services/admin/industry.service';

export const createIndustryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const industryName: string = req.body?.name;

    // Check for any duplicate values.
    const isDuplicate = await getIndustryByName(industryName.toLowerCase());
    if (isDuplicate) {
      next({ status: 403, message: 'Duplicate industry name not allowed.' });
    }

    const newIndustry = await createIndustry({
      name: industryName.toLowerCase(),
    });
    res
      .status(201)
      .json({ message: 'Industry created successfuly', industry: newIndustry });
  } catch (error) {
    next(error);
  }
};

export const updateIndustryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const data = req.body;
  try {
    if (!id) {
      res.status(403).json({ message: 'Industry id is required.' });
    }

    const updatedIndustry = await updateIndustry(Number(id), data);

    res.status(201).json({
      message: 'Industry updated successfully',
      industry: updatedIndustry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteIndustryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(403).json({ message: 'Industry id is required.' });
    }

    const deletedIndustry = await deleteIndustry(Number(id));

    res.status(201).json({
      message: 'Industry deleted successfully',
      industry: deletedIndustry,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllIndustryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isInteresetInclude = req.query.withInterest;
  const { page, pageSize, search } = req.query;
  try {
    const industries = await getAllIndustries(
      {
        page: Number(page ?? 1),
        pageSize: Number(pageSize ?? 10),
        search: search as string,
      },
      isInteresetInclude === 'true',
    );
    res.status(200).json({
      message: 'Successfuly got all industries',
      data: industries?.data,
      pagination: industries?.pagination,
    });
  } catch (error) {
    next(error);
  }
};
